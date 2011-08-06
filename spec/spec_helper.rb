require './proxy'
require 'fakeweb'
require 'timecop'
require 'rack/test'
require 'rspec'

RSpec.configure do |conf|
  conf.include Rack::Test::Methods
end

set :environment, :test

# monkey patch rack to get sexy rspec expectation: should be_redirected_to ..
class Rack::MockResponse
  def error?
    client_error? || server_error?
  end
  def redirected_to?(target)
    redirect? && location == target
  end
end