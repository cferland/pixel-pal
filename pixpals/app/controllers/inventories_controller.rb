class InventoriesController < ApplicationController

  def create
    @inventory = current_user.inventories.create!(inv_params)
    json_response(@inventory, :created)
  end

  def index
    @inventories = current_user.inventories
    json_response(@inventories)
  end

  def destroy
    @inventory = Inventory.find(params[:id])
    @inventory.destroy
    json_response(status: 'SUCCESS', message: 'deleted the inventory', data: @inventory.id)
  end

  private

  def inv_params
    params.permit(:item_id, :user_id)
  end
end
