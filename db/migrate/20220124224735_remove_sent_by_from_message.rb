class RemoveSentByFromMessage < ActiveRecord::Migration[7.0]
  def change
    remove_column :messages, :sent_by, :string
  end
end
