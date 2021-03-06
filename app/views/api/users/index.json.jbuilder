json.array! @users do |user|
  json.extract! user, :id, :username
  json.avatar_url asset_path(user.avatar.url)
  json.avatar_url_thumb asset_path(user.avatar.url(:thumb))
end
