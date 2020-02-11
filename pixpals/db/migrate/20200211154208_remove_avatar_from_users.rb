class RemoveAvatarFromUsers < ActiveRecord::Migration[6.0]
  def change
    remove_reference :users, :avatar, null: false, foreign_key: true
  end
end
