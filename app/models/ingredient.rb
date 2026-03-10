class Ingredient < ApplicationRecord

  # Associations#################################################################
  has_many :recipe_ingredients, :dependent => :destroy
  has_many :recipes, :through => :recipe_ingredients
  has_many :user_ingredients, :dependent => :destroy
  has_many :users, :through => :user_ingredients

  validates :name, presence: true

end
