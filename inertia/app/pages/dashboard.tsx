import { Head, Link } from '@inertiajs/react'
import { 
    Briefcase, 
    Clock, 
    CheckCircle, 
    DollarSign,
    TrendingUp,
    FileText,
    Calendar,
    Plus,
    Users,
    Activity,
    ArrowRight,
    ChevronRight,
    AlertCircle,
    Package,
    Sparkles
} from 'lucide-react'
import { useEffect, useState } from 'react'

interface Project {
    id: number
    title: string
    description: string
    category: string
    status: string
    statusText: string
    statusColor: string
    deadline: string
    budget: string
    rawBudget: number
    createdAt: string
    daysAgo: number
}

interface Service {
    id: number
    name: string
    description: string
    price: string
    rawPrice: number
    icon: string
}

interface ActivityItem {
    id: number
    type: string
    title: string
    description: string
    time: string
    timestamp: string
    icon: string
    color: string
}

interface DashboardProps {
    user?: {
        id: number
        fullName: string
        email: string
        phone: string
        createdAt: string
        avatar: string
    }
    stats?: {
        totalProjects: number
        activeProjects: number
        completedProjects: number
        totalSpent: number
        totalSpentFormatted: string
    }
    recentProjects?: Project[]
    availableServices?: Service[]
    projectsByStatus?: Record<string, number>
    recentActivity?: ActivityItem[]
    error?: string
}

export default function Dashboard({ 
    user, 
    stats, 
    recentProjects = [], 
    availableServices = [],
    recentActivity = [],
    error 
}: DashboardProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'services'>('overview')

    // Format tanggal relatif
    const formatRelativeTime = (dateString: string) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffMs = now.getTime() - date.getTime()
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
        
        if (diffDays === 0) return 'Hari ini'
        if (diffDays === 1) return 'Kemarin'
        if (diffDays < 7) return `${diffDays} hari yang lalu`
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} minggu yang lalu`
        if (diffDays < 365) return `${Math.floor(diffDays / 30)} bulan yang lalu`
        return `${Math.floor(diffDays / 365)} tahun yang lalu`
    }

    // Default values jika data undefined
    const safeUser = user || {
        id: 0,
        fullName: 'Guest',
        email: 'guest@example.com',
        phone: '-',
        createdAt: new Date().toLocaleDateString('id-ID'),
        avatar: ''
    }

    const safeStats = stats || {
        totalProjects: 0,
        activeProjects: 0,
        completedProjects: 0,
        totalSpent: 0,
        totalSpentFormatted: 'Rp 0'
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="text-center">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Error</h1>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <Link href="/login" className="text-blue-600 hover:text-blue-700">
                        Kembali ke Login
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="Dashboard - ANOCODE" />
            
            {/* Header */}
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                                    <Package className="w-6 h-6 text-white" />
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900">ANOCODE</h1>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <p className="text-sm font-medium text-gray-900">{safeUser.fullName}</p>
                                <p className="text-xs text-gray-500">Klien</p>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                                {safeUser.fullName.charAt(0)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Selamat datang, <span className="text-blue-600">{safeUser.fullName}</span>! 👋
                            </h1>
                            <p className="text-gray-600 mt-2">
                                Kelola semua proyek desain Anda dengan mudah di ANOCODE
                            </p>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            <span>Bergabung {safeUser.createdAt}</span>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Total Projects Card */}
                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Total Proyek</p>
                                <p className="text-3xl font-bold mt-2">{safeStats.totalProjects}</p>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <Briefcase className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm text-green-600">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            <span>Semua proyek Anda</span>
                        </div>
                    </div>

                    {/* Active Projects Card */}
                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Proyek Aktif</p>
                                <p className="text-3xl font-bold mt-2">{safeStats.activeProjects}</p>
                            </div>
                            <div className="p-3 bg-yellow-100 rounded-lg">
                                <Activity className="w-6 h-6 text-yellow-600" />
                            </div>
                        </div>
                        <div className="mt-4 text-sm text-gray-500">
                            Dalam proses pengerjaan
                        </div>
                    </div>

                    {/* Completed Projects Card */}
                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Selesai</p>
                                <p className="text-3xl font-bold mt-2">{safeStats.completedProjects}</p>
                            </div>
                            <div className="p-3 bg-green-100 rounded-lg">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                        <div className="mt-4 text-sm text-gray-500">
                            Proyek berhasil diselesaikan
                        </div>
                    </div>

                    {/* Total Spent Card */}
                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Total Pengeluaran</p>
                                <p className="text-3xl font-bold mt-2">
                                    {safeStats.totalSpentFormatted}
                                </p>
                            </div>
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <DollarSign className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                        <div className="mt-4 text-sm text-gray-500">
                            Untuk semua proyek
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Projects & Activity */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Recent Projects */}
                        <div className="bg-white rounded-xl shadow-md border border-gray-200">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-bold text-gray-900">Proyek Terbaru</h2>
                                    <Link 
                                        href="/service/product" 
                                        className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                                    >
                                        Lihat semua <ChevronRight className="w-4 h-4 ml-1" />
                                    </Link>
                                </div>
                            </div>
                            
                            <div className="p-6">
                                {recentProjects.length > 0 ? (
                                    <div className="space-y-4">
                                        {recentProjects.map((project) => (
                                            <div 
                                                key={project.id} 
                                                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                            >
                                                <div className="flex items-center space-x-4">
                                                    <div className={`p-3 rounded-lg ${project.statusColor}`}>
                                                        <span className="text-lg">{project.status === 'Baru' ? '🆕' : 
                                                                                 project.status === 'Proses' ? '⚙️' : 
                                                                                 project.status === 'Selesai' ? '✅' : '✏️'}</span>
                                                    </div>
                                                    <div>
                                                        <h3 className="font-medium text-gray-900">{project.title}</h3>
                                                        <div className="flex items-center space-x-3 text-sm text-gray-500 mt-1">
                                                            <span>{project.category}</span>
                                                            <span>•</span>
                                                            <span className={`px-2 py-1 rounded-full text-xs ${project.statusColor}`}>
                                                                {project.statusText}
                                                            </span>
                                                            <span>•</span>
                                                            <span className="flex items-center">
                                                                <Calendar className="w-3 h-3 mr-1" />
                                                                {project.daysAgo === 0 ? 'Hari ini' : `${project.daysAgo} hari lalu`}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-medium text-gray-900">{project.budget}</div>
                                                    <div className="text-sm text-gray-500">Deadline: {project.deadline}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                        <p className="text-gray-500 mb-2">Belum ada proyek</p>
                                        <p className="text-sm text-gray-400 mb-4">
                                            Mulai dengan memesan jasa desain pertama Anda
                                        </p>
                                        <Link 
                                            href="/service/product" 
                                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                        >
                                            <Plus className="w-4 h-4 mr-2" />
                                            Pesan Jasa Desain
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-xl shadow-md border border-gray-200">
                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-xl font-bold text-gray-900">Aktivitas Terbaru</h2>
                            </div>
                            
                            <div className="p-6">
                                {recentActivity.length > 0 ? (
                                    <div className="space-y-4">
                                        {recentActivity.map((activity) => (
                                            <div key={activity.id} className="flex items-start">
                                                <div className={`p-2 rounded-lg ${activity.color} mr-3`}>
                                                    <span className="text-sm">{activity.icon}</span>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                                                    <p className="text-xs text-gray-500 mt-1">{activity.description}</p>
                                                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-sm text-center py-4">
                                        Belum ada aktivitas
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Services & Quick Actions */}
                    <div className="space-y-6">
                        {/* Available Services */}
                        <div className="bg-white rounded-xl shadow-md border border-gray-200">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-bold text-gray-900">Jasa Desain</h2>
                                    <Sparkles className="w-5 h-5 text-yellow-500" />
                                </div>
                            </div>
                            
                            <div className="p-6">
                                <div className="space-y-4">
                                    {availableServices.map((service) => (
                                        <div 
                                            key={service.id}
                                            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                                        >
                                            <div className="flex items-center">
                                                <div className="p-2 bg-gray-100 rounded-lg mr-3">
                                                    <span className="text-lg">{service.icon}</span>
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-gray-900">{service.name}</h3>
                                                    <p className="text-sm text-gray-500 truncate max-w-[150px]">
                                                        {service.description || 'Desain profesional'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-blue-600">{service.price}</div>
                                                <button className="mt-2 text-xs text-blue-600 hover:text-blue-700">
                                                    Pesan →
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    
                                    {availableServices.length === 0 && (
                                        <div className="text-center py-4">
                                            <Package className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                                            <p className="text-gray-500 text-sm">Belum ada jasa tersedia</p>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <Link 
                                        href="/service/product" 
                                        className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700"
                                    >
                                        <Plus className="w-5 h-5 mr-2" />
                                        Lihat Semua Jasa
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-md border border-blue-100 p-6">
                            <h3 className="font-bold text-gray-900 mb-4">Aksi Cepat</h3>
                            <div className="space-y-3">
                                <Link 
                                    href="/service/product" 
                                    className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all"
                                >
                                    <div className="flex items-center">
                                        <div className="p-2 bg-blue-100 rounded-lg mr-3">
                                            <Plus className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <span className="font-medium">Buat Proyek Baru</span>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-gray-400" />
                                </Link>
                                
                                <Link 
                                    href="/profile" 
                                    className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all"
                                >
                                    <div className="flex items-center">
                                        <div className="p-2 bg-green-100 rounded-lg mr-3">
                                            <Users className="w-4 h-4 text-green-600" />
                                        </div>
                                        <span className="font-medium">Profil Saya</span>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-gray-400" />
                                </Link>
                                
                                <button 
                                    onClick={() => window.location.href = '/logout'}
                                    className="w-full flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:border-red-300 hover:shadow-sm transition-all text-left"
                                >
                                    <div className="flex items-center">
                                        <div className="p-2 bg-red-100 rounded-lg mr-3">
                                            <span className="w-4 h-4 text-red-600">⎋</span>
                                        </div>
                                        <span className="font-medium text-red-600">Keluar</span>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* User Info */}
                        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                            <h3 className="font-bold text-gray-900 mb-4">Info Akun</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Email</span>
                                    <span className="font-medium">{safeUser.email}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Telepon</span>
                                    <span className="font-medium">{safeUser.phone || '-'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Bergabung</span>
                                    <span className="font-medium">{safeUser.createdAt}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-8 border-t border-gray-200 bg-white py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center mb-4 md:mb-0">
                            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg mr-3">
                                <Package className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">ANOCODE</h3>
                                <p className="text-sm text-gray-500">Platform Jasa Desain Terpercaya</p>
                            </div>
                        </div>
                        <div className="text-sm text-gray-500">
                            © {new Date().getFullYear()} ANOCODE. All rights reserved.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}