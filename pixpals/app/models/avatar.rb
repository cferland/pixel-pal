class Avatar < ApplicationRecord
  belongs_to :user
  has_many :comments

  validates_presence_of :base
end
