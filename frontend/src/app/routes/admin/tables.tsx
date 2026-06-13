import { Horses } from '@/pages/admin-tables/horses/Horses'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/tables')({
  component: Horses,
})
