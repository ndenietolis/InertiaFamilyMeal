class StaticController < ApplicationController
  before_action :authenticate_user!, only: [:kitchen]

  def index
    render inertia: {}
  end

  def kitchen
    render inertia: {}
  end
end
