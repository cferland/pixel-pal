class AddUsernameToAvatar < ActiveRecord::Migration[6.0]
  def change
    add_column :avatars, :username, :string
  end
end
