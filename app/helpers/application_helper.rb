require "ostruct"

module ApplicationHelper
  def message_style
    @message_style ||= OpenStruct.new(
      span: OpenStruct.new(
        css_class: "italic font-bold text-xs"
      ),
      container: OpenStruct.new(
        css_class: "px-4 py-2 bg-gray-200 rounded-lg"
      ),
      li: OpenStruct.new(
        css_class: "flex flex-col mt-5",
        data: OpenStruct.new(
          sent_by_self: "items-start",
          sent_by_other: "items-end",)
      )
    )
  end
end
