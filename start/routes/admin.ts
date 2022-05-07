import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('login', 'AdminAuthController.login')

  Route.group(() => {
    Route.get('me', 'AdminAuthController.me')

  }).middleware('auth:admin')

})
  .prefix('admin')
  .namespace('App/Controllers/Admin')