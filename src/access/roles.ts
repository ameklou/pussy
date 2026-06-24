import type { Access } from 'payload'

export const USER_ROLES = ['admin', 'editor'] as const
export type UserRole = (typeof USER_ROLES)[number]

type UserWithRoles = {
  roles?: unknown
}

export function hasRole(user: UserWithRoles | null | undefined, roles: ReadonlyArray<UserRole>): boolean {
  if (!user) return false

  const userRoles = user.roles
  if (!Array.isArray(userRoles)) return false

  return userRoles.some((role) => roles.includes(role as UserRole))
}

export function isAdminOrEditor(user: UserWithRoles | null | undefined): boolean {
  return hasRole(user, USER_ROLES)
}

export const adminOrEditor: Access = ({ req }) => isAdminOrEditor(req.user)

export const anyone: Access = () => true

export const publishedOrAdmin: Access = ({ req }) => {
  if (isAdminOrEditor(req.user)) {
    return true
  }

  const now = new Date().toISOString()

  return {
    and: [
      { publishedAt: { exists: true } },
      { publishedAt: { less_than_equal: now } },
    ],
  }
}
