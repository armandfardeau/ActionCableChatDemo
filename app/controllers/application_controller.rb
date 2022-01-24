class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?

  before_action :color_scheme
  after_action :custom_headers

  private

  def custom_headers
    response.headers["accept-ch"] = "Sec-CH-Prefers-Color-Scheme"
  end

  def color_scheme
    @color_scheme ||= request.headers["HTTP_SEC_CH_PREFERS_COLOR_SCHEME"] == "dark" ? "dark" : "light"
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:nickname])
  end
end
