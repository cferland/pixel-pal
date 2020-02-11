class AvatarsController < ApplicationController
  before_action :set_avatar, only: [:show, :update]

  def index
    @avatars = Avatar.all
    json_response(@avatars)
  end

  def create
    @avatar = Avatar.create!(item_params)
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
    params.permit(:base, :hair, :outfit, :user)
  end

  def set_avatar
    @avatar = Avatar.find(params[:id])
  end
end
