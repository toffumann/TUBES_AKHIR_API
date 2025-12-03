import { Head } from '@inertiajs/react'
import AdminSidebar from '../components/AdminSidebar'

interface AdminLayoutProps {
  children: React.ReactNode
  title?: string
}

export default function AdminLayout({ children, title = 'Admin Dashboard' }: AdminLayoutProps) {
  return (
    <>
      <Head>
        <title>{title} | Desain Aja Dulu</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          <AdminSidebar />
          
          {/* Main Content */}
          <div className="flex-1 p-8">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}