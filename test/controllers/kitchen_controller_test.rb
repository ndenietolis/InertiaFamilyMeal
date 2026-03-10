require "test_helper"

class KitchenControllerTest < ActionDispatch::IntegrationTest
  test "authenticated user can view recipes on kitchen page" do
    user = User.create!(
      email: "cook@example.com",
      username: "cookbook_owner",
      password: "password123",
      password_confirmation: "password123"
    )

    recipe = Recipe.create!(
      name: "Pasta Primavera",
      description: "Vegetable pasta",
      instructions: "Boil pasta and toss with vegetables."
    )
    ingredient = Ingredient.create!(name: "Pasta", description: "Dry pasta", unit_cost: 2.99)
    RecipeIngredient.create!(recipe: recipe, ingredient: ingredient)

    sign_in user

    get kitchen_path

    assert_response :success
    assert_includes @response.body, "Pasta Primavera"
    assert_includes @response.body, "Vegetable pasta"
    assert_includes @response.body, "Boil pasta and toss with vegetables."
    assert_includes @response.body, "Pasta"
  end
end
