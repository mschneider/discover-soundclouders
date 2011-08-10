require 'singleton'

class JobQueue < Array
  include Singleton
  
  def self.pop
    instance.shift
  end
  
  def self.push object
    instance.push object
    instance.uniq!
    self
  end
  
  def self.push_recommendations user
    push({
      :computation => :recommendations,
      :user => user
    })
  end
end