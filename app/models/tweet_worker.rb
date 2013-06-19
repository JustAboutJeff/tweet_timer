class TweetWorker
  include Sidekiq::Worker
  sidekiq_options retry: 3

  def perform(tweet_id)
    tweet = Tweet.find(tweet_id)
    user  = tweet.user
    user.twitter_client.update(tweet.body)
  end

  def retries_exhausted(*args)
    "This request has failed after 3 attempts"
  end
end
