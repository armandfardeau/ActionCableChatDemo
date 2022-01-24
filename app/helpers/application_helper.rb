require "ostruct"

module ApplicationHelper
  def sent_by_self?(message)
    message.sent_by == @nickname
  end

  def hidden_icon(icon_name)
    @color_scheme == icon_name ? "hidden" : ""
  end

  def message_style
    @message_style ||= OpenStruct.new(
      span: OpenStruct.new(
        css_class: "italic font-bold text-xs"
      ),
      container: OpenStruct.new(
        css_class: "px-4 py-2 bg-gray-200 rounded-lg",
        data: OpenStruct.new(
          sent_by_self: "bg-green-200 animate-pop_in_left",
          sent_by_other: "bg-blue-200 animate-pop_in_right"
        )
      ),
      li: OpenStruct.new(
        css_class: "flex flex-col mt-5",
        data: OpenStruct.new(
          sent_by_self: "items-start text-left",
          sent_by_other: "items-end text-right"
        )
      )
    )
  end
end
