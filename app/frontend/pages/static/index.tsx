import { Layout } from '@/components/static/Layout'
export default function Static() {
  return (
    <div>
      Static Page
    </div>
  )
}

Static.layout = (page: React.ReactNode) => <Layout children={page} title="FamilyMeal" />