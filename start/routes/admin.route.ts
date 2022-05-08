import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('login', 'AdminController.login')

  Route.group(() => {
    Route.get('me', 'AdminController.me')
    Route.post('logout', 'AdminController.logout')
    Route.put('change-password', 'AdminController.changePassword')
    Route.put('update-profile', 'AdminController.updateProfile')

  }).middleware('auth:admin')

})
  .prefix('admin')
  .namespace('App/Controllers/Admin')
