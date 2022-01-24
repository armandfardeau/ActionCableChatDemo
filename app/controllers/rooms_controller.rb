class RoomsController < ApplicationController
  before_action :set_room, only: %i[ show ]

  # GET /rooms/1 or /rooms/1.json
  def show
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_room
    @room = begin
              Room.includes(:messages).find(params[:id])
            rescue ActiveRecord::RecordNotFound
              OpenStruct.new(id: nil, messages: [])
            end
  end

  # Only allow a list of trusted parameters through.
  def room_params
    params.fetch(:room, {})
  end
end
