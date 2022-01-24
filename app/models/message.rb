class Message < ApplicationRecord
  belongs_to :room
  belongs_to :user

  def sent_by
    self.user.nickname
  end
end
