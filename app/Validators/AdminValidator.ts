import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from './BaseValidator'

// Admin Login
export class AdminLoginValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    email: schema.string({}, [rules.email()]),
    password: schema.string({}, [rules.minLength(6)]),
  })

  public messages = {
    ...this.messages,
  }
}

// Change Password
export class ChangePassValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    current_password: schema.string(),
    password: schema.string({}, [
      rules.minLength(6),
      rules.maxLength(180),
      rules.confirmed('password_confirmation'),
    ]),
  })

  public messages = {
    ...this.messages,
  }
}

export class UpdateProfileValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    name: schema.string({}, [rules.maxLength(50)]),
  })

  public messages = {
    ...this.messages,
  }
}
