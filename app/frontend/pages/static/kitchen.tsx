import { Layout } from '@/components/static/Layout'

export default function Kitchen() {
  return (
    <div className="mx-auto max-w-2xl rounded-2xl bg-gray-900/20 p-10 backdrop-blur-md shadow-2xl/50">
      Kitchen
    </div>
  )
}

Kitchen.layout = (page: React.ReactNode) => <Layout children={page} title="Kitchen" />
