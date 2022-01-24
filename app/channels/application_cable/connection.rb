module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = verify_user
    end

    private

    def verify_user
      env['warden']&.user or reject_unauthorized_connection
    end
  end
end
