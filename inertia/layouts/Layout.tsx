// Layouts/Layout.tsx
import { ReactNode } from 'react';
import { usePage } from '@inertiajs/react';

interface PageProps {
  auth?: {
    user?: {
      id: number;
      name: string;
      email: string;
    };
  };
  [key: string]: any;
}

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export default function Layout({ children, title = 'DesainAjaDulu' }: LayoutProps) {
  const { props } = usePage<PageProps>();
  const { auth } = props;

  const userName = auth?.user?.name || 'Guest';
  const userEmail = auth?.user?.email || '';
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <html lang="id">
      <head>
        <title>{title}</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans bg-gray-50">
        {/* Navbar */}
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <a href="/" className="text-xl font-bold text-purple-600">
                  #DesainAjaDulu
                </a>
                <span className="ml-2 text-sm text-gray-500 hidden md:inline">
                  New Zealand Specialty Professional
                </span>
              </div>
              
              <div className="flex items-center space-x-4">
                <a href="/" className="text-gray-700 hover:text-purple-600">Home</a>
                <a href="/layanan" className="text-gray-700 hover:text-purple-600">Layanan</a>
                <a href="/my-projects" className="text-gray-700 hover:text-purple-600">Project Saya</a>
                
                {/* User Info */}
                <div className="flex items-center space-x-3">
                  {auth?.user ? (
                    <>
                      <div className="hidden md:block text-right">
                        <p className="text-sm font-medium text-gray-700">{userName}</p>
                        <p className="text-xs text-gray-500 truncate max-w-[120px]">{userEmail}</p>
                      </div>
                      <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold">
                        {userInitial}
                      </div>
                      <a 
                        href="/logout" 
                        className="text-sm text-gray-500 hover:text-gray-700 hidden md:block"
                      >
                        Logout
                      </a>
                    </>
                  ) : (
                    <a 
                      href="/login" 
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                    >
                      Login
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-sm">© {new Date().getFullYear()} DesainAjaDulu. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}