class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from channel
  end

  def unsubscribed
    stop_stream_from channel
  end

  def send_message(data)
    message_params = { "sent_by" => current_user }.merge(data)

    ActionCable.server.broadcast(channel, message_params)
    SaveMessageJob.perform_later(params[:room], message_params.except("action"))
  end

  private

  def channel
    "chat_#{params[:room]}"
  end
end
