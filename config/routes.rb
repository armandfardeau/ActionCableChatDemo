Rails.application.routes.draw do
  resources :rooms, only: [:show]
  root 'home#index'
end