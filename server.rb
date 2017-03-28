require 'sinatra'
require 'mongoid'
require 'sinatra/namespace'

Mongoid.load! "mongoid.config"

class Company
	include Mongoid::Document

	field :name, type: String
	field :address, type: String
	field :city, type: String
	field :country, type: String
	field :email, type: String
	field :contact, type: String
	field :directors, type: Array

	validates :name, presence: true
	validates :address, presence: true
	validates :city, presence: true
	validates :country, presence: true
	validates :directors, presence: true

	index({ name:1 }, { unique: true, name: "name_index" })

end

class CompanySerializer  
  def initialize(company)
    @company = company
  end

  def as_json(*)
    data = {
      id:@company.id.to_s,
      name:@company.name,
      address:@company.address,
      city:@company.city,
      country:@company.country,
      email:@company.email,
      contact:@company.contact,
      directors:@company.directors
    }
    data[:errors] = @company.errors if@company.errors.any?
    data
  end
end

get '/'  do
	'Welcome to the companies api'
end

namespace '/api/v1' do

	before do
		content_type 'application/json'
		headers 'Access-Control-Allow-Origin' => '*',
            	'Access-Control-Allow-Methods' => ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE']  
	end

	helpers do
		def base_url
	      @base_url ||= "#{request.env['rack.url_scheme']}://#{request.env['HTTP_HOST']}"
	    end

		def json_params
			begin
		        JSON.parse(request.body.read)
		    rescue
		        halt 400, { message:'Invalid JSON' }.to_json
		    end
		end
	end

	

	def company
      @company ||= Company.where(id: params[:id]).first
    end

    def halt_if_not_found!
      halt(404, { message:'Company Not Found'}.to_json) unless company
    end

    def serialize(company)
      CompanySerializer.new(company).to_json
    end

	get '/companies' do
		companies = Company.all

		companies.map { |company| CompanySerializer.new(company) }.to_json
	end

	get '/companies/:id' do |id|
	    halt_if_not_found!
	    serialize(company)
	end

	post '/companies' do
	    company = Company.new(json_params)
	    halt 422, serialize(company) unless company.save
	    response.headers['Location'] = "#{base_url}/api/v1/companies/#{company.id}"
	    status 201
	  end


	put '/companies/:id' do |id|
	    halt_if_not_found!
	    halt 422, serialize(company) unless company.update_attributes(json_params)
	    serialize(company)
	  end

	delete '/companies/:id' do |id|
	    company.destroy if company
	    status 204
	end
end	
