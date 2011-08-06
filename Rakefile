require 'rspec/core/rake_task'

RSpec::Core::RakeTask.new(:spec) do |t|
  t.rspec_opts = '--color'
end

RSpec::Core::RakeTask.new(:rcov) do |t|
  t.rcov = true
end

task :default => :spec
