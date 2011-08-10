require File.expand_path(File.join(File.dirname(__FILE__),'/spec_helper'))

describe 'JobQueue' do
  
  it 'should return items in order' do
    items = [:first, :second, :third]
    items.each do | item |
      JobQueue.push item
    end
    items.each do | item |
      JobQueue.pop.should == item
    end
  end
  
  it 'should return items pushed multiple times only once' do
    items = [:first, :second, :first]
    items.each do | item |
      JobQueue.push item
    end
    items.first(2).each do | item |
      JobQueue.pop.should == item
    end
    JobQueue.pop.should be_nil
  end
end