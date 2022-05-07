import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { UserLoginValidator, UserRegisterValidator } from 'App/Validators/AuthValidator'

export default class AuthController {
  public async login({ auth, request }: HttpContextContract) {
    const payload = await request.validate(UserLoginValidator)
    const response = await auth.use('user').attempt(payload.email, payload.password)

    return response
  }

  public async register({ request, auth }: HttpContextContract) {
    const payload = await request.validate(UserRegisterValidator)
    const user = await User.create(payload)
    const token = await auth.use('user').login(user)

    return token
  }

  public me({ auth }: HttpContextContract) {
    return auth.user
  }
}
