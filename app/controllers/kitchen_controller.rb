class KitchenController < ApplicationController

  def index
    render inertia: {
      recipes: current_user.recipes.includes(:ingredients).distinct.order(:name).map do |recipe|
        {
          id: recipe.id,
          name: recipe.name,
          description: recipe.description,
          instructions: recipe.instructions,
          ingredient_names: recipe.ingredients.map(&:name).compact
        }
      end,
      ingredients: current_user.ingredients.includes(:recipes).distinct.order(:name).map do |ingredient|
        {
          id: ingredient.id,
          name: ingredient.name,
          description: ingredient.description,
          unit_cost: ingredient.unit_cost&.to_s("F"),
          recipe_names: ingredient.recipes.order(:name).pluck(:name).compact
        }
      end
    }
  end
end
