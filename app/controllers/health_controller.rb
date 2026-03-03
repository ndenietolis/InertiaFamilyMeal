class HealthController < ActionController::Metal
  def up
    self.status = 200
    self.content_type = "text/plain"
    self.response_body = "ok"
  end
end
