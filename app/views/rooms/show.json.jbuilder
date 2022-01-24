json.extract!(@room, :id)
json.messages @room.messages do |message|
  json.sent_by message.user.nickname
  json.color message.user.color
  json.text message.text
end
