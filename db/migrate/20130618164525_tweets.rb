class Tweets < ActiveRecord::Migration
  def change
    create_table :tweets do |t|
      t.references :user
      t.string     :body
      t.datetime   :tweeted_at
      
      t.timestamps
    end 
  end
end
