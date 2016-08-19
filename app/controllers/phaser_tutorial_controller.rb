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
  lastest_score = Name.save(name: params[:name], timesJumped: params[:timesJumped])
  if request.xhr?

  else
    redirect '/level1'
  end
end
