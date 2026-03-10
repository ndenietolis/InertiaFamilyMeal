class CreateIngredients < ActiveRecord::Migration[8.1]
  def change
    create_table :ingredients do |t|
      t.text :description
      t.decimal :unit_cost
      t.string :name

      t.timestamps
    end
  end
end
