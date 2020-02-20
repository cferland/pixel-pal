class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :email
      t.string :password_digest
      # t.references :avatar, null: false, foreign_key: true
      t.integer :currency

      t.timestamps
    end
  end
end
