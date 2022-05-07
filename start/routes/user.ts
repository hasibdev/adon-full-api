import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('login', 'UserAuthController.login')
  Route.post('register', 'UserAuthController.register')

  Route.group(() => {
    Route.get('me', 'UserAuthController.me')

  }).middleware('auth:user')

})
  .prefix('user')
  .namespace('App/Controllers/User')