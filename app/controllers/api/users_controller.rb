class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    if( @user.save )
      # success! login the new user
      login(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private
  def user_params
    params.require(:user).permit(:email_address, :username, :password)
  end

end