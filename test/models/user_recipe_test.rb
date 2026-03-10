require "test_helper"

class UserRecipeTest < ActiveSupport::TestCase
  test "belongs to a recipe" do
    user_recipe = user_recipes(:one)

    assert_equal recipes(:one), user_recipe.recipe
    assert_equal users(:one), user_recipe.user
  end
end
