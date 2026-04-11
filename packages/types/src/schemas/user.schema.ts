import { z } from 'zod'

export const UserRoleSchema = z.enum(['SUPER_ADMIN', 'FOUNDATION_ADMIN', 'VERIFIED_USER', 'VISITOR'])
export type UserRole = z.infer<typeof UserRoleSchema>

export const AuthUserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  avatar_url: z.string().nullable(),
  role: UserRoleSchema,
  foundation_id: z.string().nullable(),
})
export type AuthUser = z.infer<typeof AuthUserSchema>
