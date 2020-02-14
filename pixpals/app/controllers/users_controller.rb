class UsersController < ApplicationController
  skip_before_action :authorize_request, only: :create

  def create
    user = User.create!(user_params)
    auth_token = AuthenticateUser.new(user.email, user.password).call
    response = { message: Message.account_created, auth_token: auth_token, user: user }
    json_response(response, :created)
  end

  def update
    @current_user.update(user_params)
    json_response(status: 'SUCCESS', message: 'user updated successfully', data: @current_user.currency)
  end

  private

  def user_params
    params
        .permit(
        :username,
        :email,
        :password,
        :password_confirmation,
        :currency)
        .with_defaults(currency: 100)
  end
end
