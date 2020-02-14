class User < ApplicationRecord
  has_secure_password

  def to_param
    username
  end

  has_one :avatar, foreign_key: :user_id
  has_many :comments, foreign_key: :created_by
  has_many :inventories
  has_many :items, through: :inventories

  validates :username, uniqueness: true, presence: true
  validates :email, uniqueness: true, presence: true
  validates :password_digest, presence: true
end
