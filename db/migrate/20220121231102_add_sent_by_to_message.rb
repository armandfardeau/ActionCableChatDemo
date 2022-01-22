class AddSentByToMessage < ActiveRecord::Migration[7.0]
  def change
    add_column :messages, :sent_by, :string
  end
end
