import * as React from 'react'
import { Link, useForm } from '@inertiajs/react'
import type { FormEvent } from 'react'

import { Layout } from '@/components/static/Layout'
import { Button } from '@/components/ui/button'
import { FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { FormErrors, IngredientPageData } from '@/types'

type IngredientPageProps = {
  ingredient: IngredientPageData | null
  errors?: FormErrors
}

function FieldError({ error }: { error?: string | string[] }) {
  if (!error) return null
  return <p className="text-sm text-red-600">{Array.isArray(error) ? error[0] : error}</p>
}

export default function IngredientShow({ ingredient, errors = {} }: IngredientPageProps) {
  const isNewIngredient = ingredient?.id == null
  const { data, setData, post, patch, processing } = useForm({
    name: ingredient?.name ?? '',
    description: ingredient?.description ?? '',
    unit_cost: ingredient?.unit_cost ?? '',
  })

  React.useEffect(() => {
    setData({
      name: ingredient?.name ?? '',
      description: ingredient?.description ?? '',
      unit_cost: ingredient?.unit_cost ?? '',
    })
  }, [ingredient, setData])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (isNewIngredient) {
      post('/ingredients')
    } else {
      patch(`/ingredients/${ingredient.id}`)
    }
  }

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-3xl border border-white/15 bg-white/78 p-6 shadow-2xl shadow-black/10 backdrop-blur-md sm:p-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Ingredient
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              {isNewIngredient ? 'Create Ingredient' : (ingredient?.name || 'Untitled ingredient')}
            </h1>
            <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
              {isNewIngredient
                ? 'Start with an empty ingredient and save it to add it to your kitchen.'
                : 'Ingredient details from the database.'}
            </p>
          </div>

          <Button asChild variant="outline">
            <Link href="/kitchen">Back to Kitchen</Link>
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid gap-2">
            <FieldLabel htmlFor="ingredient-name">Name</FieldLabel>
            <Input
              id="ingredient-name"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              placeholder="Garlic"
              className="border-slate-300 bg-white"
            />
            <FieldError error={errors.name} />
          </div>

          <div className="grid gap-2">
            <FieldLabel htmlFor="ingredient-description">Description</FieldLabel>
            <Textarea
              id="ingredient-description"
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
              placeholder="Fresh minced garlic"
              className="min-h-28 border-slate-300 bg-white"
            />
            <FieldError error={errors.description} />
          </div>

          <div className="grid gap-2">
            <FieldLabel htmlFor="ingredient-unit-cost">Unit Cost</FieldLabel>
            <Input
              id="ingredient-unit-cost"
              type="number"
              step="0.01"
              min="0"
              value={data.unit_cost}
              onChange={(e) => setData('unit_cost', e.target.value)}
              placeholder="2.99"
              className="border-slate-300 bg-white"
            />
            <FieldError error={errors.unit_cost} />
          </div>

          {!isNewIngredient && ingredient?.recipe_names?.length ? (
            <div className="grid gap-2">
              <FieldLabel>Recipes</FieldLabel>
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                {ingredient.recipe_names.join(', ')}
              </div>
            </div>
          ) : null}

          <div className="flex justify-end">
            <Button type="submit" disabled={processing} className="bg-slate-900 text-white hover:bg-slate-800">
              {processing ? 'Saving...' : isNewIngredient ? 'Save Ingredient' : 'Update Ingredient'}
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}

IngredientShow.layout = (page: React.ReactNode) => <Layout children={page} title="Ingredient" />
