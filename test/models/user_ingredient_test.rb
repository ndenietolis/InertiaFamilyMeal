require "test_helper"

class UserIngredientTest < ActiveSupport::TestCase
  test "belongs to an ingredient" do
    user_ingredient = user_ingredients(:one)

    assert_equal ingredients(:one), user_ingredient.ingredient
    assert_equal users(:one), user_ingredient.user
  end
end
