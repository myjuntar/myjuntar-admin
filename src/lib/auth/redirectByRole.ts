export function redirectByRole(role: string | null) {
  switch (role) {
    case 'super_admin':
      return '/admin'
    case 'venue_owner':
      return '/my-venues'
    case 'customer_support':
      return '/support/dashboard'
    default:
      return '/explore'
  }
}
