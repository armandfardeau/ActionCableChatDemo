class SaveMessageJob < ApplicationJob
  queue_as :default

  def perform(room, attributes)
    @room = Room.find_or_create_by!(id: room)
    @room.messages.create!(attributes)
  end
end
