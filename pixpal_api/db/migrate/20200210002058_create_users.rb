class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :email
      t.string :password_digest
      t.string :comments
      t.string :inventory
      t.string :currency
      t.references :avatar, null: false, foreign_key: true

      t.timestamps
    end
  end
end
