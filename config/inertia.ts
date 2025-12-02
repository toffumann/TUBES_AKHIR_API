// config/inertia.ts
import { defineConfig } from '@adonisjs/inertia'
import type { HttpContext } from '@adonisjs/core/http'

export default defineConfig({
  /**
   * Path to the Edge view that will be used as the root view for Inertia responses
   */
  rootView: 'inertia_layout',

  /**
   * Data that should be shared with all rendered pages
   */
  sharedData: {
    errors: (ctx: HttpContext) => ctx.session.flashMessages.get('errors') || {},
    success: (ctx: HttpContext) => ctx.session.flashMessages.get('success') || '',
    auth: {
      user: (ctx: HttpContext) => ctx.session.get('user') || null
    }
  },

  /**
   * Options for the server-side rendering
   */
  ssr: {
    enabled: false,
    bundle: 'inertia/app/ssr'
  }
})