class Tweet < ActiveRecord::Base
  belongs_to :user

  validates :body, presence: true
  validates :tweet_at, presence: true
  validates :user_id, presence: true

end
