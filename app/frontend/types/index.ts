export type FlashData = {
  notice?: string
  alert?: string
}

export type RecipeRow = {
  id: number
  name: string | null
  description: string | null
  instructions: string | null
  ingredient_names: string[]
}

export type RecipePageData = {
  id: number | null
  name: string | null
  description: string | null
  instructions: string | null
  ingredient_names: string[]
}

export type IngredientRow = {
  id: number
  name: string | null
  description: string | null
  unit_cost: string | null
  recipe_names: string[]
}

export type IngredientPageData = {
  id: number | null
  name: string | null
  description: string | null
  unit_cost: string | null
  recipe_names?: string[]
}

export type FormErrors = Record<string, string | string[]>

export type SharedProps = {
  auth?: {
    user?: {
      id: number
      email: string
    } | null
  }
}
