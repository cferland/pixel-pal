class AvatarsController < ApplicationController
  skip_before_action :authorize_request, only: [:show, :index]
  before_action :set_avatar, only: [:show, :update]

  def index
    @avatars = Avatar.all
    json_response(@avatars)
  end

  def create
    @avatar = Avatar.create!(avatar_params)
    json_response(@avatar, :created)
  end

  def show
    json_response(@avatar)
  end

  def update
    @avatar.update(avatar_params)
    json_response(status: 'SUCCESS', message: 'updated the avatar')
  end

  private

  def avatar_params
    params.permit(:base, :hair, :outfit, :username, :user_id)
        .with_defaults(username: current_user.username, user_id: current_user.id)
  end

  def set_avatar
    @avatar = Avatar.find(params[:id])
  end
end
