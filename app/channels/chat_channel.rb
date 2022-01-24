class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from channel
  end

  def unsubscribed
    stop_stream_from channel
  end

  def send_message(data)
    message_params = { user: current_user, "sent_by" => current_user.nickname }.merge(data)

    ActionCable.server.broadcast(channel, message_params.except(:user))
    SaveMessageJob.perform_later(params[:room], message_params.except("action", "sent_by"))
  end

  private

  def channel
    "chat_#{params[:room]}"
  end
end
