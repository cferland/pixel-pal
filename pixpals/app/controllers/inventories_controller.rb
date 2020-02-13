class InventoriesController < ApplicationController

  def create
    @item = Item.find(params[:id])
    @current_user.inventories << @item
  end

  def index
    @inventories = Inventory.find(session[:user_id])
    json_response(@inventories)
  end
end
