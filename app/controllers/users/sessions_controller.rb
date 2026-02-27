# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  # before_action :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  def new
    render inertia: 'Auth/Login', props: {}
  end

  # POST /resource/sign_in
  def create
    self.resource = warden.authenticate(auth_options)

    if resource
      set_flash_message!(:notice, :signed_in)
      sign_in(resource_name, resource)
      respond_with resource, location: after_sign_in_path_for(resource)
    else
      self.resource = resource_class.new(sign_in_params)
      clean_up_passwords(resource)
      set_minimum_password_length

      render inertia: 'Auth/Login',
             props: {
               errors: {
                 email: [I18n.t('devise.failure.invalid', authentication_keys: 'Email')]
               }
             },
             status: :unprocessable_entity
    end
  end

  # DELETE /resource/sign_out
  def destroy
    super
  end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end

  protected

  def sign_in_params
    params.fetch(resource_name, params).permit(:email, :password, :remember_me, :remember)
  end
end
