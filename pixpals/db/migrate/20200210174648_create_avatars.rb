class CreateAvatars < ActiveRecord::Migration[6.0]
  def change
    create_table :avatars do |t|
      t.string :base
      t.string :hair
      t.string :outfit
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
