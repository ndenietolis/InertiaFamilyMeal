require "test_helper"

class UserTest < ActiveSupport::TestCase
  test "owns recipes through user_recipes" do
    assert_includes users(:one).recipes, recipes(:one)
  end

  test "owns ingredients through user_ingredients" do
    assert_includes users(:one).ingredients, ingredients(:one)
  end
end
