import { createFileRoute } from '@tanstack/react-router'
import ProfileMePage from '@/pages/profile/ProfileMePage'

export const Route = createFileRoute('/profiles/me')({
  component: ProfileMePage,
})
