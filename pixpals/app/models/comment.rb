class Comment < ApplicationRecord
  belongs_to :avatar

  validates_presence_of :content, :created_by
end
