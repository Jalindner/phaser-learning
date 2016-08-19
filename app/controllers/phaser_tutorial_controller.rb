get '/helloworld' do
  erb :tutorial
end

get '/level1' do
  erb :'/levels/level1'
end

get '/submit' do
  erb :'_submit', layout: false
end

post '/submit' do

  redirect '/level1'
end
