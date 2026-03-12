class IngredientsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_ingredient, only: [:show, :update]

  def new
    render inertia: "ingredients/show", props: ingredient_page_props
  end

  def show
    render inertia: "ingredients/show", props: ingredient_page_props(ingredient: serialized_ingredient(@ingredient))
  end

  def create
    ingredient = Ingredient.new(ingredient_params)

    if ingredient.save
      current_user.user_ingredients.create!(ingredient: ingredient)
      redirect_to ingredient_path(ingredient), notice: "Ingredient created."
    else
      render inertia: "ingredients/show",
             props: ingredient_page_props(
               errors: ingredient.errors.to_hash(true),
               ingredient: {
                 id: nil,
                 name: ingredient.name,
                 description: ingredient.description,
                 unit_cost: ingredient.unit_cost&.to_s
               }
             ),
             status: :unprocessable_entity
    end
  end

  def update
    if @ingredient.update(ingredient_params)
      redirect_to ingredient_path(@ingredient), notice: "Ingredient updated."
    else
      render inertia: "ingredients/show",
             props: ingredient_page_props(
               errors: @ingredient.errors.to_hash(true),
               ingredient: {
                 id: @ingredient.id,
                 name: @ingredient.name,
                 description: @ingredient.description,
                 unit_cost: @ingredient.unit_cost&.to_s,
                 recipe_names: @ingredient.recipes.order(:name).pluck(:name).compact
               }
             ),
             status: :unprocessable_entity
    end
  end

  private

  def ingredient_params
    permitted = params.fetch(:ingredient, params).permit(:name, :description, :unit_cost)
    permitted[:unit_cost] = nil if permitted[:unit_cost].blank?
    permitted
  end

  def set_ingredient
    @ingredient = current_user.ingredients.includes(:recipes).find(params[:id])
  end

  def serialized_ingredient(ingredient)
    {
      id: ingredient.id,
      name: ingredient.name,
      description: ingredient.description,
      unit_cost: ingredient.unit_cost&.to_s("F"),
      recipe_names: ingredient.recipes.order(:name).pluck(:name).compact
    }
  end

  def ingredient_page_props(**extra_props)
    {
      ingredient: nil,
      errors: {}
    }.merge(extra_props)
  end
end
