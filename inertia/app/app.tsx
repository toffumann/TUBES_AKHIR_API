// inertia/app/app.tsx
import '../css/app.css'  // ← PERUBAHAN DI SINI! dari "../css/app.css"
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { createRoot } from 'react-dom/client'

console.log('🚀 DesainHub starting...')

createInertiaApp({
  title: (title) => title ? `${title} - DesainHub` : 'DesainHub',
  resolve: (name) => {
    return resolvePageComponent(
      `./pages/${name}.tsx`,
      import.meta.glob('./pages/**/*.tsx')
    )
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})