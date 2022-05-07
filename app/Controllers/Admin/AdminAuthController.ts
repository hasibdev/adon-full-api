import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { AdminLoginValidator } from 'App/Validators/AuthValidator'

export default class AuthController {
  public async login({ auth, request, response }: HttpContextContract) {
    const payload = await request.validate(AdminLoginValidator)
    try {
      const token = await auth.use('admin').attempt(payload.email, payload.password)
      return token
    } catch (error) {
      return response.status(400).json({ errors: [{ message: 'Email or Password is wrong!' }] })
    }
  }

  public me({ auth }: HttpContextContract) {
    return auth.user
  }
}
