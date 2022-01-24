class ApplicationController < ActionController::Base
  before_action :color_scheme
  after_action :custom_headers

  def custom_headers
    response.headers["accept-ch"] = "Sec-CH-Prefers-Color-Scheme"
  end

  def color_scheme
    @color_scheme ||= request.headers["HTTP_SEC_CH_PREFERS_COLOR_SCHEME"] == "dark" ? "dark" : "light"
  end
end
