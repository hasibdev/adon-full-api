import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('login', 'UserController.login')
  Route.post('register', 'UserController.register')

  Route.group(() => {
    Route.get('me', 'UserController.me')
    Route.post('logout', 'UserController.logout')
    Route.put('change-password', 'UserController.changePassword')
    Route.put('update-profile', 'UserController.updateProfile')
    Route.put('update-avatar', 'UserController.updateAvatar')
  }).middleware('auth:user')
})
  .prefix('user')
  .namespace('App/Controllers/User')
