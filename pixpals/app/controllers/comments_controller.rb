class CommentsController < ApplicationController
  before_action :set_avatar
  before_action :set_comment, only: [:show, :update, :destroy]

  def index
    json_response(@avatar.comments)
  end

  def create
    @comment = @avatar.comments.create!(comment_params)
    json_response(@comment, :created)
  end

  def show
    json_response(@comment)
  end

  def update
    @comment.update(comment_params)
    json_response(status: 'SUCCESS', message: 'updated the comment')
  end

  def destroy
    @comment.destroy
    json_response(status: 'SUCCESS', message: 'deleted the comment')
  end

  private

  def comment_params
    params.permit(:content, :created_by)
        .with_defaults(created_by: current_user.username)
  end

  def set_avatar
    @avatar = Avatar.find(params[:avatar_id])
  end

  def set_comment
    @comment = @avatar.comments.find_by!(id: params[:id]) if @avatar
  end
end
