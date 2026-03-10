import * as React from 'react'
import { Link, useForm } from '@inertiajs/react'
import type { FormEvent } from 'react'

import { Layout } from '@/components/static/Layout'
import { Button } from '@/components/ui/button'
import { FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { FormErrors, RecipePageData } from '@/types'

type RecipePageProps = {
  recipe: RecipePageData | null
  errors?: FormErrors
}

function FieldError({ error }: { error?: string | string[] }) {
  if (!error) return null
  return <p className="text-sm text-red-600">{Array.isArray(error) ? error[0] : error}</p>
}

export default function RecipeShow({ recipe, errors = {} }: RecipePageProps) {
  const isNewRecipe = recipe?.id == null
  const { data, setData, post, processing } = useForm({
    name: recipe?.name ?? '',
    description: recipe?.description ?? '',
    instructions: recipe?.instructions ?? '',
    ingredient_list: recipe?.ingredient_names.join(', ') ?? '',
  })

  React.useEffect(() => {
    setData({
      name: recipe?.name ?? '',
      description: recipe?.description ?? '',
      instructions: recipe?.instructions ?? '',
      ingredient_list: recipe?.ingredient_names.join(', ') ?? '',
    })
  }, [recipe, setData])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    post('/recipes')
  }

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-3xl border border-white/15 bg-white/78 p-6 shadow-2xl shadow-black/10 backdrop-blur-md sm:p-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Recipe
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              {isNewRecipe ? 'Create Recipe' : (recipe?.name || 'Untitled recipe')}
            </h1>
            <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
              {isNewRecipe
                ? 'Start with an empty recipe and save it to add it to your kitchen.'
                : 'Recipe details from the database.'}
            </p>
          </div>

          <Button asChild variant="outline">
            <Link href="/kitchen">Back to Kitchen</Link>
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid gap-2">
            <FieldLabel htmlFor="recipe-name">Name</FieldLabel>
            <Input
              id="recipe-name"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              placeholder="Weeknight pasta"
              className="border-slate-300 bg-white"
              readOnly={!isNewRecipe}
            />
            <FieldError error={errors.name} />
          </div>

          <div className="grid gap-2">
            <FieldLabel htmlFor="recipe-description">Description</FieldLabel>
            <Textarea
              id="recipe-description"
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
              placeholder="Short summary of the dish"
              className="min-h-24 border-slate-300 bg-white"
              readOnly={!isNewRecipe}
            />
            <FieldError error={errors.description} />
          </div>

          <div className="grid gap-2">
            <FieldLabel htmlFor="recipe-instructions">Instructions</FieldLabel>
            <Textarea
              id="recipe-instructions"
              value={data.instructions}
              onChange={(e) => setData('instructions', e.target.value)}
              placeholder="Step-by-step instructions"
              className="min-h-40 border-slate-300 bg-white"
              readOnly={!isNewRecipe}
            />
            <FieldError error={errors.instructions} />
          </div>

          <div className="grid gap-2">
            <FieldLabel htmlFor="recipe-ingredients">Ingredients</FieldLabel>
            <Input
              id="recipe-ingredients"
              value={data.ingredient_list}
              onChange={(e) => setData('ingredient_list', e.target.value)}
              placeholder="Pasta, Garlic, Olive oil"
              className="border-slate-300 bg-white"
              readOnly={!isNewRecipe}
            />
            <FieldError error={errors.ingredient_list} />
          </div>

          {isNewRecipe ? (
            <div className="flex justify-end">
              <Button type="submit" disabled={processing} className="bg-slate-900 text-white hover:bg-slate-800">
                {processing ? 'Saving...' : 'Save Recipe'}
              </Button>
            </div>
          ) : null}
        </form>
      </div>
    </section>
  )
}

RecipeShow.layout = (page: React.ReactNode) => <Layout children={page} title="Recipe" />
