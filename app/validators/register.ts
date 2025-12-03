import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
    vine.object({
        fullName: vine.string().trim().minLength(6),
        email: vine.string().trim().email(),
        password: vine.string().trim().minLength(6),
        nomorTelepon: vine.string().optional(),
    })
)