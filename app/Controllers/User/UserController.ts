import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { ChangePassValidator, UserLoginValidator, UserRegisterValidator } from 'App/Validators/AuthValidator'

export default class AuthController {
  public async login({ auth, request, response }: HttpContextContract) {
    const payload = await request.validate(UserLoginValidator)

    try {
      const response = await auth.use('user').attempt(payload.email, payload.password)
      return response
    } catch (error) {
      return response.status(400).json({ errors: [{ message: 'Email or Password is wrong!' }] })
    }
  }

  public async register({ request, auth }: HttpContextContract) {
    const payload = await request.validate(UserRegisterValidator)
    const user = await User.create(payload)
    const token = await auth.use('user').login(user)

    return token
  }

  public async me({ auth }: HttpContextContract) {
    return auth.user
  }

  public async logout({ auth }: HttpContextContract) {
    return await auth.logout()
  }

  public async changePassword({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(ChangePassValidator)

    try {
      const user = await auth.verifyCredentials(auth.user?.email!, payload.current_password)
      user.password = payload.password
      user.save()

      return user
    } catch (error) {
      return response.status(400).json({ ...error, message: "Current Password is wrong" })
    }

  }

  public async updateProfile() {
    return 'Update'
  }
}
