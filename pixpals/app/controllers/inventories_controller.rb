class InventoriesController < ApplicationController

  def create
    @inventory = current_user.inventories.create!(inv_params)
    json_response(@inventory, :created)
  end

  def index
    @inventories = current_user.inventories
    json_response(@inventories)
  end

  private

  def inv_params
    params.permit(:item_id, :user_id)
  end
end
