import * as React from 'react'

import { Link } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Layout } from '@/components/static/Layout'
import type { IngredientRow, RecipeRow } from '@/types'

type KitchenProps = {
  recipes: RecipeRow[]
  ingredients: IngredientRow[]
}

function truncate(value: string | null, length: number) {
  if (!value) return '—'
  if (value.length <= length) return value
  return `${value.slice(0, length).trim()}…`
}

type KitchenTab = 'recipes' | 'ingredients'

function TabButton({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? 'border-b-2 border-slate-900 pb-1 text-3xl font-semibold tracking-tight text-slate-900'
          : 'border-b-2 border-transparent pb-1 text-3xl font-semibold tracking-tight text-slate-400 transition-colors hover:text-slate-700'
      }
    >
      {label}
    </button>
  )
}

export default function Kitchen({ recipes, ingredients }: KitchenProps) {
  const [activeTab, setActiveTab] = React.useState<KitchenTab>('recipes')

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-3xl border border-white/15 bg-white/78 p-6 shadow-2xl shadow-black/10 backdrop-blur-md sm:p-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Kitchen
            </p>
            <div className="flex items-center gap-4">
              <TabButton
                label="Recipes"
                active={activeTab === 'recipes'}
                onClick={() => setActiveTab('recipes')}
              />
              <TabButton
                label="Ingredients"
                active={activeTab === 'ingredients'}
                onClick={() => setActiveTab('ingredients')}
              />
            </div>
            <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
              Browse the recipes and ingredients currently stored in the app database.
            </p>
          </div>

          <Button asChild className="bg-slate-900 text-white hover:bg-slate-800">
            <Link href={activeTab === 'recipes' ? '/recipes/new' : '/ingredients/new'}>
              {activeTab === 'recipes' ? 'Create Recipe' : 'Create Ingredient'}
            </Link>
          </Button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90">
          {activeTab === 'recipes' ? (
            <Table>
              <TableHeader className="bg-slate-50/90">
                <TableRow className="hover:bg-slate-50/90">
                  <TableHead className="w-[18%]">Name</TableHead>
                  <TableHead className="w-[26%]">Description</TableHead>
                  <TableHead className="w-[28%]">Instructions</TableHead>
                  <TableHead>Ingredients</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recipes.length > 0 ? (
                  recipes.map((recipe) => (
                    <TableRow key={recipe.id} className="border-slate-200/80">
                      <TableCell className="font-medium text-slate-900">
                        <Link href={`/recipes/${recipe.id}`} className="transition-colors hover:text-slate-600">
                          {recipe.name || 'Untitled recipe'}
                        </Link>
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {truncate(recipe.description, 90)}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {truncate(recipe.instructions, 110)}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {recipe.ingredient_names.length > 0
                          ? recipe.ingredient_names.join(', ')
                          : 'No ingredients linked'}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="border-slate-200/80">
                    <TableCell colSpan={4} className="py-10 text-center text-slate-500">
                      No recipes found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          ) : (
            <Table>
              <TableHeader className="bg-slate-50/90">
                <TableRow className="hover:bg-slate-50/90">
                  <TableHead className="w-[24%]">Name</TableHead>
                  <TableHead className="w-[36%]">Description</TableHead>
                  <TableHead className="w-[14%]">Unit Cost</TableHead>
                  <TableHead>Recipes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ingredients.length > 0 ? (
                  ingredients.map((ingredient) => (
                    <TableRow key={ingredient.id} className="border-slate-200/80">
                      <TableCell className="font-medium text-slate-900">
                        <Link href={`/ingredients/${ingredient.id}`} className="transition-colors hover:text-slate-600">
                          {ingredient.name || 'Untitled ingredient'}
                        </Link>
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {truncate(ingredient.description, 110)}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {ingredient.unit_cost ? `$${ingredient.unit_cost}` : '—'}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {ingredient.recipe_names.length > 0
                          ? ingredient.recipe_names.join(', ')
                          : 'No recipes linked'}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="border-slate-200/80">
                    <TableCell colSpan={4} className="py-10 text-center text-slate-500">
                      No ingredients found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </section>
  )
}

Kitchen.layout = (page: React.ReactNode) => <Layout children={page} title="Kitchen" />
