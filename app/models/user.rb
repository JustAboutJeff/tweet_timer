class User < ActiveRecord::Base
  has_many :tweets
  
  validates :username,     presence: true
  validates :oauth_token,  presence: true,
                           uniqueness: true
  validates :oauth_secret, presence: true,
                           uniqueness: true

  def tweet(body)
    tweet = Tweet.create!(:body => body, user_id: self.id)
    TweetWorker.perform_async(tweet.id)
  end

  def twitter_client
    @twitter_client ||= Twitter::Client.new(
      oauth_token: oauth_token,
      oauth_token_secret: oauth_secret
    )
  end

end
