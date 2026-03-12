class RecipeIngredientsController < ApplicationController
  before_action :authenticate_user!

  def create
    recipe = current_user.recipes.find(params[:recipe_id])
    p '######################################################################'
    ingredient = current_user.ingredients.find(recipe_ingredient_params[:ingredient_id])

    recipe_ingredient = recipe.recipe_ingredients.find_or_initialize_by(ingredient: ingredient)

    if recipe_ingredient.save
      redirect_to recipe_path(recipe), notice: "Ingredient added to recipe."
    else
      redirect_to recipe_path(recipe), alert: recipe_ingredient.errors.full_messages.to_sentence
    end
  end

  def destroy
    recipe = current_user.recipes.find(params[:recipe_id])
    recipe_ingredient = recipe.recipe_ingredients.find(params[:id])

    recipe_ingredient.destroy!

    redirect_to recipe_path(recipe), notice: "Ingredient removed from recipe."
  end

  private

  def recipe_ingredient_params
    params.fetch(:recipe_ingredient, params).permit(:ingredient_id)
  end
end
