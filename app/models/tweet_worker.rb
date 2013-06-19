class TweetWorker < ActiveRecord::Base
  include Sidekiq::Worker

  def perform(tweet_id)
    tweet = Tweet.find(tweet_id)
    user  = tweet.user

    # set up Twitter OAuth client here
    # actually make API call
    # Note: this does not have access to controller/view helpers
    # You'll have to re-initialize everything inside here
  end

  # def job_is_complete(jid)
  #   waiting = Sidekiq::Queue.new
  #   working = Sidekiq::Workers.new
  #   return false if waiting.find { |job| job.jid == jid }
  #   return false if working.find { |worker, info| info["payload"]["jid"] == jid }
  #   true
  # end
  

end
