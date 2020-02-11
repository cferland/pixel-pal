class Item < ApplicationRecord
  has_many :inventories
  has_many :users, through: :inventories

  validates_presence_of :name, :cost, :image
end
