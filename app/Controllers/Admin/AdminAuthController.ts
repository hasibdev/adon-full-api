import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { AdminLoginValidator } from 'App/Validators/AuthValidator'

export default class AuthController {
  public async login({ auth, request }: HttpContextContract) {
    const payload = await request.validate(AdminLoginValidator)
    const token = await auth.use('admin').attempt(payload.email, payload.password)

    return token
  }

  public me({ auth }: HttpContextContract) {
    return auth.user
  }
}
