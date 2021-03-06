class Member < ApplicationRecord
  validates :chatroom_id, :user_id, presence: true
  validates :chatroom_id, uniqueness: {scope: :user_id}

  belongs_to :chatroom,
  foreign_key: :chatroom_id,
  class_name: :Chatroom

  belongs_to :user,
  foreign_key: :user_id,
  class_name: :User

end
