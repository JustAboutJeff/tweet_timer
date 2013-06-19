class User < ActiveRecord::Base
  has_many :tweets
  
  validates :username,     presence: true
  validates :oauth_token,  presence: true,
                           uniqueness: true
  validates :oauth_secret, presence: true,
                           uniqueness: true

  def tweet(status)
    tweet = tweets.create!(:status => status)
    TweetWorker.perform_async(tweet.id)
  end

end
