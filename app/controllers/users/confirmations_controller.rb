# frozen_string_literal: true

class Users::ConfirmationsController < Devise::ConfirmationsController
  protected

  # The path used after resending confirmation instructions.
   def after_resending_confirmation_instructions_path_for(resource_name)
     root_path
   end

  # The path used after confirmation.
   def after_confirmation_path_for(resource_name, resource)
     root_path
   end
end
