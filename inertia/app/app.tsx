// inertia/app/app.tsx
import './css/app.css'
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'

createInertiaApp({
  title: (title) => title ? `${title} - DesainHub` : 'DesainHub',
  resolve: async (name) => {
    console.log(`📄 Loading: ${name}`)
    
    // GUNAKAN RELATIVE PATH YANG BENAR
    // app.tsx ada di: inertia/app/app.tsx
    // pages ada di: inertia/app/pages/
    // Jadi: './pages/' dari app.tsx
    
    try {
      const pages = import.meta.glob('./pages/*.tsx', { eager: true })
      console.log('📁 Pages ditemukan:', Object.keys(pages))
      
      const pagePath = `./pages/${name}.tsx`
      
      if (pages[pagePath]) {
        console.log(`✅ ${name} ditemukan di ${pagePath}`)
        return pages[pagePath]
      }
      
      console.error(`❌ ${name} TIDAK ditemukan di ${pagePath}`)
      
    } catch (error) {
      console.error('❌ Error loading page:', error)
    }
    
    // Fallback minimal
    return {
      default: () => <div>Loading {name}...</div>
    }
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})