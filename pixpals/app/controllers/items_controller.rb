class ItemsController < ApplicationController
  skip_before_action :authorize_request
  before_action :set_item, only: [:show, :update, :destroy]

  def index
    @items = Item.all
    json_response(@items)
  end

  def create
    @item = Item.create!(item_params)
    json_response(@item, :created)
  end

  def show
    json_response(@item)
  end

  def update
    @item.update(item_params)
    json_response(status: 'SUCCESS', message: 'updated the item', data: @item.name)
  end

  def destroy
    @item.destroy
    json_response(status: 'SUCCESS', message: 'deleted the item', data: @item.name)
  end

  private

  def item_params
    params.permit(:name, :cost, :image)
  end

  def set_item
    @item = Item.find(params[:id])
  end
end
