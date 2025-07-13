export function redirectByRole(role: string): string {
  if (role === 'user') return '/explore'
  return '/dashboard'
}