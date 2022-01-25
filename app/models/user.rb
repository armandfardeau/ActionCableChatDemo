class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  COLOR_LIST = %w[red orange amber yellow lime green emerald teal cyan sky blue indigo violet purple fuchsia pink rose]
  COLOR_ACCENTUATED_LIST = [50, 100, 200, 300, 400]
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :messages, dependent: :destroy

  validates :nickname, presence: true, uniqueness: true

  before_create :set_color

  def set_color
    self.color = "#{COLOR_LIST.sample}-#{COLOR_ACCENTUATED_LIST.sample}"
  end
end
