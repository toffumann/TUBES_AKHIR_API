// inertia/app/app.tsx
import './css/app.css'
import { createInertiaApp, Head } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
      </Head>

      <div id="app-layout">
        {children}
      </div>
    </>
  )
}

createInertiaApp({
  title: (title) => title ? `${title} - DesainHub` : 'DesainHub',

  resolve: async (name) => {
    const pages: any = import.meta.glob('./pages/*.tsx')

    const importPage = pages[`./pages/${name}.tsx`]

    // 🛑 Jika halaman tidak ditemukan
    if (!importPage) {
      console.error(`❌ Page not found: ${name}`)
      return { default: () => <div>Page "{name}" tidak ditemukan</div> }
    }

    // ⬇️ TypeScript fix: ubah unknown ke any
    const page: any = await importPage()

    // Tambahkan layout default jika belum ada
    if (!page.default.layout) {
      page.default.layout = (pageRender: any) => (
        <AppLayout>{pageRender}</AppLayout>
      )
    }

    return page
  },

  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})
