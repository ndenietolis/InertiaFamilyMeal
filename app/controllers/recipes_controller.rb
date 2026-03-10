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
                 ingredient_names: ingredient_names
               }
             ),
             status: :unprocessable_entity
    end
  end

  private

  def recipe_params
    params.fetch(:recipe, params).permit(:name, :description, :instructions)
  end

  def ingredient_names
    params.fetch(:recipe, params)
          .fetch(:ingredient_list, "")
          .split(",")
          .map(&:strip)
          .reject(&:blank?)
          .uniq { |name| name.downcase }
  end

  def attach_ingredients(recipe)
    ingredient_names.each do |ingredient_name|
      ingredient = Ingredient.find_or_create_by!(name: ingredient_name)
      recipe.ingredients << ingredient unless recipe.ingredients.exists?(ingredient.id)
    end
  end

  def set_recipe
    @recipe = Recipe.includes(:ingredients).find(params[:id])
  end

  def serialized_recipe(recipe)
    {
      id: recipe.id,
      name: recipe.name,
      description: recipe.description,
      instructions: recipe.instructions,
      ingredient_names: recipe.ingredients.map(&:name).compact
    }
  end

  def recipe_page_props(**extra_props)
    {
      recipe: nil,
      errors: {}
    }.merge(extra_props)
  end
end
