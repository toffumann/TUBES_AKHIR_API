import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import Services from '#models/services'
import Projects from '#models/projects'
import { DateTime } from 'luxon'

export default class DashboardController {
    async index({ auth, response, inertia, request }: HttpContext) {
        try {
            const tokenFromUrl = request.qs().token
    if (tokenFromUrl) {
        console.log('🔑 Token dari URL:', tokenFromUrl.substring(0, 20) + '...')
        // Set token ke header request
        request.request.headers['authorization'] = `Bearer ${tokenFromUrl}`
    }
            // Autentikasi user
            await auth.authenticate()
            const user = auth.user!
            
            // 1. Ambil statistik user
            const [totalProjects, activeProjects, completedProjects] = await Promise.all([
                Projects.query().where('id_user', user.id).count('* as total').first(),
                Projects.query()
                    .where('id_user', user.id)
                    .whereIn('status_project', ['Baru', 'Proses', 'Revisi'])
                    .count('* as total')
                    .first(),
                Projects.query()
                    .where('id_user', user.id)
                    .where('status_project', 'Selesai')
                    .count('* as total')
                    .first()
            ])
            
            // 2. Hitung total pengeluaran
            const userProjects = await Projects.query()
                .where('id_user', user.id)
                .preload('service')
            
            let totalSpent = 0
            userProjects.forEach(project => {
                if (project.service) {
                    totalSpent += Number(project.service.harga) || 0
                }
            })
            
            // 3. Ambil proyek terbaru (5 terbaru)
            const recentProjects = await Projects.query()
                .where('id_user', user.id)
                .preload('service')
                .orderBy('created_at', 'desc')
                .limit(5)
            
            // 4. Ambil semua services yang tersedia
            const availableServices = await Services.query().limit(8)
            
            // 5. Hitung proyek berdasarkan status
            const projectsByStatusQuery = await Projects.query()
                .where('id_user', user.id)
                .groupBy('status_project')
                .select('status_project')
                .count('* as count')
            
            const projectsByStatus = projectsByStatusQuery.reduce((acc, item) => {
                acc[item.status_project] = Number(item.$extras.count)
                return acc
            }, {} as Record<string, number>)
            
            // 6. Format data untuk Inertia
            const dashboardData = {
                user: {
                    id: user.id,
                    fullName: user.fullName,
                    email: user.email,
                    phone: user.nomorTelepon,
                    createdAt: user.createdAt.toFormat('dd/MM/yyyy'),
                    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=4f46e5&color=fff`
                },
                stats: {
                    totalProjects: Number(totalProjects?.$extras.total) || 0,
                    activeProjects: Number(activeProjects?.$extras.total) || 0,
                    completedProjects: Number(completedProjects?.$extras.total) || 0,
                    totalSpent: totalSpent,
                    totalSpentFormatted: this.formatCurrency(totalSpent)
                },
                recentProjects: recentProjects.map(project => ({
                    id: project.id,
                    title: project.service?.namaService || 'Proyek Desain',
                    description: project.service?.deskripsi?.substring(0, 100) + '...' || 'Tidak ada deskripsi',
                    category: 'Desain ' + (project.service?.namaService || 'Umum'),
                    status: project.status_project,
                    statusText: this.getStatusText(project.status_project),
                    statusColor: this.getStatusColor(project.status_project),
                    deadline: project.tanggal_mulai?.toFormat('dd/MM/yyyy') || '-',
                    budget: project.service?.harga ? this.formatCurrency(project.service.harga) : 'Rp 0',
                    rawBudget: project.service?.harga || 0,
                    createdAt: project.createdAt.toFormat('dd/MM/yyyy HH:mm'),
                    daysAgo: Math.floor((DateTime.now().toMillis() - project.createdAt.toMillis()) / (1000 * 60 * 60 * 24))
                })),
                availableServices: availableServices.map(service => ({
                    id: service.id,
                    name: service.namaService,
                    description: service.deskripsi,
                    price: this.formatCurrency(service.harga),
                    rawPrice: service.harga,
                    icon: this.getServiceIcon(service.namaService)
                })),
                projectsByStatus: projectsByStatus,
                recentActivity: recentProjects.map(project => ({
                    id: project.id,
                    type: 'project',
                    title: `Proyek "${project.service?.namaService || 'Desain'}" dibuat`,
                    description: `Status: ${this.getStatusText(project.status_project)}`,
                    time: project.createdAt.toRelative(),
                    timestamp: project.createdAt.toISO(),
                    icon: this.getStatusIcon(project.status_project),
                    color: this.getStatusColor(project.status_project)
                }))
            }
            
            // Render Inertia page dengan data
            return inertia.render('dashboard', dashboardData)
            
        } catch (error) {
            console.error('Dashboard error:', error)
            
            // Jika error auth, redirect ke login
            if (error.code === 'E_UNAUTHORIZED_ACCESS') {
                return response.redirect('/login')
            }
            
            // Render dengan data kosong jika error lain
            return inertia.render('dashboard', {
                user: null,
                stats: { totalProjects: 0, activeProjects: 0, completedProjects: 0, totalSpent: 0, totalSpentFormatted: 'Rp 0' },
                recentProjects: [],
                availableServices: [],
                projectsByStatus: {},
                recentActivity: [],
                error: 'Gagal memuat data dashboard'
            })
        }
    }
    
    // API endpoint untuk data dashboard (untuk AJAX)
    async api({ auth, response }: HttpContext) {
        try {
            await auth.authenticate()
            const user = auth.user!
            
            const totalProjects = await Projects.query()
                .where('id_user', user.id)
                .count('* as total')
                .first()
            
            const recentProjects = await Projects.query()
                .where('id_user', user.id)
                .preload('service')
                .orderBy('created_at', 'desc')
                .limit(3)
            
            return response.json({
                success: true,
                data: {
                    totalProjects: Number(totalProjects?.$extras.total) || 0,
                    recentProjects: recentProjects.map(p => ({
                        id: p.id,
                        title: p.service?.namaService,
                        status: p.status_project,
                        createdAt: p.createdAt.toISO()
                    }))
                }
            })
            
        } catch (error) {
            return response.status(401).json({
                success: false,
                message: 'Unauthorized'
            })
        }
    }
    
    // Helper function untuk format currency
    private formatCurrency(amount: number): string {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount)
    }
    
    // Helper function untuk icon status
    private getStatusIcon(status: string): string {
        const icons: Record<string, string> = {
            'Baru': '🆕',
            'Proses': '⚙️',
            'Revisi': '✏️',
            'Selesai': '✅',
            'Batal': '❌',
            'batal': '❌'
        }
        return icons[status] || '📋'
    }
    
    // Helper function untuk text status
    private getStatusText(status: string): string {
        const texts: Record<string, string> = {
            'Baru': 'Baru',
            'Proses': 'Dalam Proses',
            'Revisi': 'Perlu Revisi',
            'Selesai': 'Selesai',
            'Batal': 'Dibatalkan',
            'batal': 'Dibatalkan'
        }
        return texts[status] || 'Tidak Diketahui'
    }
    
    // Helper function untuk warna status
    private getStatusColor(status: string): string {
        const colors: Record<string, string> = {
            'Baru': 'bg-blue-100 text-blue-800',
            'Proses': 'bg-yellow-100 text-yellow-800',
            'Revisi': 'bg-orange-100 text-orange-800',
            'Selesai': 'bg-green-100 text-green-800',
            'Batal': 'bg-red-100 text-red-800',
            'batal': 'bg-red-100 text-red-800'
        }
        return colors[status] || 'bg-gray-100 text-gray-800'
    }
    
    // Helper function untuk icon service
    private getServiceIcon(serviceName: string): string {
        const icons: Record<string, string> = {
            'Logo': '🖼️',
            'UI/UX': '🎨',
            'Website': '🌐',
            'Branding': '🏢',
            'Ilustrasi': '✏️',
            'Packaging': '📦',
            'Social Media': '📱',
            'Print Design': '🖨️'
        }
        
        for (const [key, icon] of Object.entries(icons)) {
            if (serviceName.toLowerCase().includes(key.toLowerCase())) {
                return icon
            }
        }
        
        return '🎨'
    }
}