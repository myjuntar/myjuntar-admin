import { redirect } from 'next/navigation'

export default function HomePage() {
  redirect('/login') // or /explore if public-facing page is coming
}
