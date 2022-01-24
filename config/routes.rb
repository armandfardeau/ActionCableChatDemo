Rails.application.routes.draw do
  devise_for :users
  resources :rooms, only: [:show]
  root 'home#index'
end