import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('login', 'AdminAuthController.login')

  Route.group(() => {
    Route.get('me', 'AdminAuthController.me')
    Route.post('logout', 'AdminAuthController.logout')
    Route.put('change-password', 'AdminAuthController.changePassword')

  }).middleware('auth:admin')

})
  .prefix('admin')
  .namespace('App/Controllers/Admin')