import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from './BaseValidator'

// Admin Login
export class AdminLoginValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    email: schema.string({}, [
      rules.email()
    ]),
    password: schema.string({}, [
      rules.minLength(6)
    ])
  })

  public messages = {
    ...this.messages
  }
}

// Admin Change Password
export class AdminChangePassValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    current_password: schema.string(),
    password: schema.string({}, [
      rules.minLength(6),
      rules.maxLength(180),
      rules.confirmed('password_confirmation')
    ])
  })

  public messages = {
    ...this.messages
  }
}

// User Login
export class UserLoginValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    email: schema.string({}, [
      rules.email()
    ]),
    password: schema.string({}, [
      rules.minLength(6),
    ])
  })

  public messages = {
    ...this.messages
  }
}

// User Register
export class UserRegisterValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    first_name: schema.string({}, [
      rules.maxLength(50)
    ]),
    last_name: schema.string({}, [
      rules.maxLength(50)
    ]),
    email: schema.string({}, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email', caseInsensitive: true })
    ]),
    password: schema.string({}, [
      rules.minLength(6),
      rules.maxLength(180),
      rules.confirmed('password_confirmation')
    ])
  })

  public messages = {
    ...this.messages
  }
}
