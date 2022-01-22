class HomeController < ApplicationController
  def index
    @username = cookies.signed[:current_username] ||= assign_username
    @messages = Message.where(room_id: params[:room_id])
  end

  private

  def assign_username
    user_id = REDIS.incr('user_count')

    "User_#{user_id}"
  end
end