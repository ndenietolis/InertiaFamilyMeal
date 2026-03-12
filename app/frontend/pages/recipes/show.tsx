import * as React from 'react'
import { Link, router, useForm } from '@inertiajs/react'
import type { SyntheticEvent } from 'react'
import { Trash2 } from 'lucide-react'

import { SearchSelect } from '@/components/common/SearchSelect'
import { Layout } from '@/components/static/Layout'
import { Button } from '@/components/ui/button'
import { FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import type { FormErrors, IngredientOption, RecipePageData } from '@/types'

type RecipePageProps = {
  recipe: RecipePageData | null
  errors?: FormErrors
  availableIngredients: IngredientOption[]
}

function FieldError({ error }: { error?: string | string[] }) {
  if (!error) return null
  return <p className="text-sm text-red-600">{Array.isArray(error) ? error[0] : error}</p>
}

export default function RecipeShow({
  recipe,
  errors = {},
  availableIngredients,
}: RecipePageProps) {
  const isNewRecipe = recipe?.id == null
  const { data, setData, post, processing } = useForm({
    name: recipe?.name ?? '',
    description: recipe?.description ?? '',
    instructions: recipe?.instructions ?? '',
    ingredient_list: '',
  })
  const [selectedIngredientId, setSelectedIngredientId] = React.useState<number | null>(null)
  const [recipeIngredientProcessing, setRecipeIngredientProcessing] = React.useState(false)

  React.useEffect(() => {
    setData({
      name: recipe?.name ?? '',
      description: recipe?.description ?? '',
      instructions: recipe?.instructions ?? '',
      ingredient_list: '',
    })
  }, [recipe, setData])

  const selectableIngredients = React.useMemo(() => {
    const selectedIds = new Set(recipe?.recipe_ingredients?.map((item) => item.ingredient_id) ?? [])
    return availableIngredients.filter((ingredient) => !selectedIds.has(ingredient.id))
  }, [availableIngredients, recipe?.recipe_ingredients])

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    post('/recipes')
  }

  const handleIngredientSelect = (ingredientId: number) => {
    if (!recipe?.id) return

    setSelectedIngredientId(ingredientId)
    setRecipeIngredientProcessing(true)
    router.post(`/recipes/${recipe.id}/recipe_ingredients`, {
      ingredient_id: ingredientId,
    }, {
      preserveScroll: true,
      onSuccess: () => {
        setSelectedIngredientId(null)
        setRecipeIngredientProcessing(false)
      },
      onError: () => {
        setRecipeIngredientProcessing(false)
      },
      onFinish: () => {
        setRecipeIngredientProcessing(false)
      },
    })
  }

  const handleRecipeIngredientDelete = (recipeIngredientId: number) => {
    if (!recipe?.id) return

    router.delete(`/recipes/${recipe.id}/recipe_ingredients/${recipeIngredientId}`, {
      preserveScroll: true,
    })
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

          {isNewRecipe ? (
            <div className="flex justify-end">
              <Button type="submit" disabled={processing} className="bg-slate-900 text-white hover:bg-slate-800">
                {processing ? 'Saving...' : 'Save Recipe'}
              </Button>
            </div>
          ) : null}
        </form>

        {!isNewRecipe ? (
          <div className="mt-10 border-t border-slate-200 pt-8">
            <div className="mb-4">
              <h2 className="text-xl font-semibold tracking-tight text-slate-900">Recipe Ingredients</h2>
              <p className="mt-1 text-sm text-slate-600">
                Search your ingredients and add them to this recipe.
              </p>
            </div>

            <div className="grid gap-2">
              <FieldLabel htmlFor="recipe-ingredient-search">Ingredients</FieldLabel>
              <SearchSelect
                id="recipe-ingredient-search"
                items={selectableIngredients}
                placeholder="Search your ingredients..."
                emptyMessage="No matching user ingredients found."
                disabled={recipeIngredientProcessing}
                selectedItemId={selectedIngredientId}
                getItemId={(ingredient) => ingredient.id}
                getItemLabel={(ingredient) => ingredient.name || 'Untitled ingredient'}
                getItemDescription={(ingredient) => ingredient.description || 'No description'}
                onSelect={(ingredient) => handleIngredientSelect(ingredient.id)}
              />
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90">
              <Table>
                <TableHeader className="bg-slate-50/90">
                  <TableRow className="hover:bg-slate-50/90">
                    <TableHead className="w-[28%]">Ingredient</TableHead>
                    <TableHead className="w-[44%]">Description</TableHead>
                    <TableHead>Unit Cost</TableHead>
                    <TableHead className="w-[1%] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recipe?.recipe_ingredients?.length ? (
                    recipe.recipe_ingredients.map((recipeIngredient) => (
                      <TableRow key={recipeIngredient.id} className="border-slate-200/80">
                        <TableCell className="font-medium text-slate-900">
                          <Link
                            href={`/ingredients/${recipeIngredient.ingredient_id}`}
                            className="transition-colors hover:text-slate-600"
                          >
                            {recipeIngredient.ingredient_name || 'Untitled ingredient'}
                          </Link>
                        </TableCell>
                        <TableCell className="text-slate-600">
                          {recipeIngredient.ingredient_description || '—'}
                        </TableCell>
                        <TableCell className="text-slate-600">
                          {recipeIngredient.ingredient_unit_cost
                            ? `$${recipeIngredient.ingredient_unit_cost}`
                            : '—'}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            className="text-slate-500 hover:bg-slate-100 hover:text-red-600"
                            onClick={() => handleRecipeIngredientDelete(recipeIngredient.id)}
                          >
                            <Trash2 className="size-4" />
                            <span className="sr-only">Remove ingredient from recipe</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow className="border-slate-200/80">
                      <TableCell colSpan={4} className="py-10 text-center text-slate-500">
                        No recipe ingredients added yet.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}

RecipeShow.layout = (page: React.ReactNode) => <Layout children={page} title="Recipe" />
