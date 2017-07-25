class MovieService
	attr_reader :configuration
	
	def initialize
		@configuration = Tmdb::Configuration.new
		@tmdb = Tmdb::Movie
	end
	
	def now_playing
		@tmdb.now_playing
	end
	
	def find(keyword)
		@tmdb.find(keyword)
	end
end
