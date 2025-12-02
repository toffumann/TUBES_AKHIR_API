// app/validators/auth.ts
import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

// Register Validator
export const registerValidator = vine.compile(
  vine.object({
    full_name: vine.string().minLength(3).maxLength(255),
    email: vine
      .string()
      .email()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    password: vine.string().minLength(6).confirmed(),
    nomor_telepon: vine.string().optional(),
  })
)

// Login Validator
export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string(),
    remember: vine.boolean().optional(),
  })
)