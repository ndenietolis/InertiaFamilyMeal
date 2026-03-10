class FixUserOwnershipJoinTables < ActiveRecord::Migration[8.1]
  def change
    remove_foreign_key :user_recipes, :ingredients
    remove_index :user_recipes, :ingredient_id
    rename_column :user_recipes, :ingredient_id, :recipe_id
    add_index :user_recipes, :recipe_id
    add_foreign_key :user_recipes, :recipes

    remove_foreign_key :user_ingredients, :recipes
    remove_index :user_ingredients, :recipe_id
    rename_column :user_ingredients, :recipe_id, :ingredient_id
    add_index :user_ingredients, :ingredient_id
    add_foreign_key :user_ingredients, :ingredients
  end
end
