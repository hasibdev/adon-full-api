import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { AdminLoginValidator, ChangePassValidator, UpdateProfileValidator } from 'App/Validators/AdminValidator'

export default class AuthController {
  // Login
  // @return token
  public async login({ auth, request, response }: HttpContextContract) {
    const payload = await request.validate(AdminLoginValidator)
    try {
      const token = await auth.use('admin').attempt(payload.email, payload.password)
      return token
    } catch (error) {
      return response.status(400).json({ errors: [{ message: 'Email or Password is wrong!' }] })
    }
  }

  // User Profile
  // @return loggedin User data
  public me({ auth }: HttpContextContract) {
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
