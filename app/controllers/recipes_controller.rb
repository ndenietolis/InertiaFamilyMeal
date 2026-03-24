class RecipesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_recipe, only: [:show]

  def new
    render inertia: "recipes/show", props: recipe_page_props
  end

  def show
    render inertia: "recipes/show", props: recipe_page_props(recipe: serialized_recipe(@recipe))
  end

  def create
    recipe = Recipe.new(recipe_params)

    if recipe.save
      current_user.user_recipes.create!(recipe: recipe)
      attach_ingredients(recipe)
      redirect_to recipe_path(recipe), notice: "Recipe created."
    else
      render inertia: "recipes/show",
             props: recipe_page_props(
               errors: recipe.errors.to_hash(true),
               recipe: {
                 id: nil,
                 name: recipe.name,
                 description: recipe.description,
                 instructions: recipe.instructions,
                 ingredient_names: selected_ingredients.map(&:name),
                 selected_ingredient_ids: selected_ingredient_ids,
                 recipe_ingredients: serialized_selected_ingredients
               }
             ),
             status: :unprocessable_entity
    end
  end

  private

  def recipe_params
    params.fetch(:recipe, params).permit(:name, :description, :instructions)
  end

  def selected_ingredient_ids
    Array(params.fetch(:recipe, params)[:ingredient_ids]).reject(&:blank?).map(&:to_i).uniq
  end

  def selected_ingredients
    current_user.ingredients.distinct.where(id: selected_ingredient_ids).order(:name)
  end

  def attach_ingredients(recipe)
    return if selected_ingredient_ids.empty?

    selected_ingredients.find_each do |ingredient|
      recipe.recipe_ingredients.find_or_create_by!(ingredient: ingredient)
    end
  end

  def set_recipe
    @recipe = current_user.recipes.includes(recipe_ingredients: :ingredient).find(params[:id])
  end

  def serialized_recipe(recipe)
    {
      id: recipe.id,
      name: recipe.name,
      description: recipe.description,
      instructions: recipe.instructions,
      ingredient_names: recipe.ingredients.map(&:name).compact,
      recipe_ingredients: recipe.recipe_ingredients.map do |recipe_ingredient|
        {
          id: recipe_ingredient.id,
          ingredient_id: recipe_ingredient.ingredient.id,
          ingredient_name: recipe_ingredient.ingredient.name,
          ingredient_description: recipe_ingredient.ingredient.description,
          ingredient_unit_cost: recipe_ingredient.ingredient.unit_cost&.to_s("F")
        }
      end
    }
  end

  def serialized_selected_ingredients
    selected_ingredients.map do |ingredient|
      {
        id: nil,
        ingredient_id: ingredient.id,
        ingredient_name: ingredient.name,
        ingredient_description: ingredient.description,
        ingredient_unit_cost: ingredient.unit_cost&.to_s("F")
      }
    end
  end

  def recipe_page_props(**extra_props)
    {
      recipe: nil,
      errors: {},
      availableIngredients: current_user.ingredients.distinct.order(:name).map do |ingredient|
        {
          id: ingredient.id,
          name: ingredient.name,
          description: ingredient.description,
          unit_cost: ingredient.unit_cost&.to_s("F")
        }
      end
    }.merge(extra_props)
  end
end
