// app/services/google_auth.ts
import { OAuth2Client } from 'google-auth-library'

export class GoogleAuthService {
  private client: OAuth2Client

  constructor() {
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
      throw new Error('Google OAuth credentials not found in environment variables')
    }
    
    this.client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      'http://localhost:3333/auth/google/callback'
    )
  }

  generateAuthUrl(): string {
    return this.client.generateAuthUrl({
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
        'openid'
      ],
      prompt: 'consent'
    })
  }

  async getToken(code: string) {
    const { tokens } = await this.client.getToken(code)
    return tokens
  }

  // app/services/google_auth.ts - PERBAIKI getUserInfo
async getUserInfo(idToken: string) {
  try {
    const ticket = await this.client.verifyIdToken({
      idToken: idToken,
      audience: process.env.GOOGLE_CLIENT_ID
    })
    
    const payload = ticket.getPayload()
    
    if (!payload) {
      throw new Error('Invalid token payload')
    }
    
    // 👇 BERIKAN DEFAULT VALUES JIKA undefined
    return {
      id: payload.sub || '', // default empty string
      email: payload.email || '', // default empty string
      name: payload.name || '', // default empty string
      picture: payload.picture || null, // null jika undefined
      emailVerified: payload.email_verified || false // false jika undefined
    }
  } catch (error) {
    console.error('Error verifying Google token:', error)
    throw error
  }
}
}