class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  inertia_share auth: -> {
    {
      user: current_user&.as_json(only: [:id, :email])
    }
  }

  private

  def after_sign_in_path_for(_resource)
    kitchen_path
  end

  def after_sign_out_path_for(_resource_or_scope)
    user_session_path
  end
end
