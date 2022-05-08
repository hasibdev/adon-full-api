import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import {
  ChangePassValidator,
  UpdateProfileValidator,
  UserLoginValidator,
  UserRegisterValidator,
} from 'App/Validators/UserValidator'

export default class AuthController {
  // Login
  // @return token
  public async login({ auth, request, response }: HttpContextContract) {
    const payload = await request.validate(UserLoginValidator)

    try {
      const token = await auth.use('user').attempt(payload.email, payload.password)
      return token
    } catch (error) {
      return response.status(400).json({ errors: [{ message: 'Email or Password is wrong!' }] })
    }
  }

  // Register
  // @return token
  public async register({ request, auth }: HttpContextContract) {
    const payload = await request.validate(UserRegisterValidator)
    const user = await User.create(payload)
    const token = await auth.use('user').login(user)

    return token
  }

  // User Profile
  // @return loggedin User data
  public async me({ auth }: HttpContextContract) {
    return auth.user
  }

  // Logout
  // @return void
  public async logout({ auth }: HttpContextContract) {
    return await auth.logout()
  }

  // Change Passowrd
  // @return success message
  public async changePassword({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(ChangePassValidator)

    try {
      const user = await auth.verifyCredentials(auth.user?.email!, payload.current_password)
      user.password = payload.password
      user.save()

      return response.json({ message: 'Successfully changed password.' })
    } catch (error) {
      return response.status(400).json({ ...error, message: 'Current Password is wrong' })
    }
  }

  // Update Profile
  // @return Updated user data
  public async updateProfile({ request, auth }: HttpContextContract) {
    const payload = await request.validate(UpdateProfileValidator)
    const user = await auth.user?.merge(payload).save()

    return user
  }
}
