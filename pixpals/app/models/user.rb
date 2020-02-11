class User < ApplicationRecord
  has_secure_password

  belongs_to :avatar
  has_many :comments, foreign_key: :created_by
  has_many :inventories
  has_many :items, through: :inventories

  validates :username, uniqueness: true, presence: true
  validates :email, uniqueness: true, presence: true
  validates :password_digest, presence: true
end
