class Recipe < ApplicationRecord

  # Associations#################################################################
  has_many :recipe_ingredients, :dependent => :destroy
  has_many :ingredients, :through => :recipe_ingredients
  has_many :user_recipes, :dependent => :destroy
  has_many :users, :through => :user_recipes

end
