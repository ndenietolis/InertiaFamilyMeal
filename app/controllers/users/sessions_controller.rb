# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController

  # GET /resource/sign_in
  def new
    render inertia: 'Auth/Login', props: {}
  end

  # POST /resource/sign_in
  def create
    self.resource = User.by_username_or_email(sign_in_params[:username_or_email])

    if resource&.valid_password?(sign_in_params[:password])
      set_flash_message!(:notice, :signed_in)
      sign_in(resource_name, resource)
      resource.remember_me if ActiveModel::Type::Boolean.new.cast(sign_in_params[:remember_me])
      respond_with resource, location: after_sign_in_path_for(resource)
    else
      if resource
        clean_up_passwords(resource)
      end

      render inertia: "Auth/Login",
            props: {
              errors: {
                username_or_email: [
                  I18n.t("devise.failure.invalid", authentication_keys: "Username or email")
                ]
              }
            },
            status: :unprocessable_entity
    end
  end

  # DELETE /resource/sign_out
  def destroy
    super
  end

  protected

  def sign_in_params
    source = params[resource_name] || params[:session] || params
    source.permit(:email, :username_or_email, :password, :remember_me)
  end
end
