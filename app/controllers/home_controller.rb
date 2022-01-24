class HomeController < ApplicationController
  helper_method :distinct_rooms

  def index
    @messages = Message.where(room_id: params[:room_id]).includes(:user)
  end

  private

  def distinct_rooms
    return [0, 1] if Room.count.zero?

    Room.pluck(:id) << Room.count
  end
end