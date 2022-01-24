class HomeController < ApplicationController
  helper_method :distinct_rooms

  def index
    @username = cookies.signed[:current_username] ||= assign_username
    @messages = Message.where(room_id: params[:room_id])
  end

  private

  def assign_username
    "User_#{User.create.id}"
  end

  def distinct_rooms
    return [0, 1] if Room.count.zero?

    Room.pluck(:id) << Room.count
  end
end