get '/' do
  erb :index
end

get '/sign_in' do
  redirect request_token.authorize_url
end

get '/sign_out' do
  session.clear
  redirect '/'
end

get '/auth' do
  @access_token = request_token.get_access_token(:oauth_verifier => params[:oauth_verifier])
  session.delete(:request_token)
  user = User.find_or_create_by_oauth_token(username: @access_token.params[:screen_name],
                     oauth_token: @access_token.params[:oauth_token],
                     oauth_secret: @access_token.params[:oauth_token_secret])
  session[:user_id] = user.id
  erb :tweet
end

post '/tweet' do
  if request.xhr?
    current_user.tweet(params)
  else
    current_user.tweet(params)
    erb :tweet
  end
end

get '/tweet/:job_id' do
  job_is_complete?(params[:job_id])
end


