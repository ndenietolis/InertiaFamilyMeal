import { Layout } from '@/components/static/Layout'
import { StaticBody } from '@/components/static/StaticBody'
export default function Static() {
  return (
    <StaticBody />
  )
}

Static.layout = (page: React.ReactNode) => <Layout children={page} title="FamilyMeal" />