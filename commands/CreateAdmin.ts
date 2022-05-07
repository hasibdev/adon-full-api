import { BaseCommand } from '@adonisjs/core/build/standalone'


export default class CreateAdmin extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'create:admin'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = 'Create Admin user'

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command. Don't forget to call `node ace generate:manifest` 
     * afterwards.
     */
    loadApp: true,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process. Don't forget to call 
     * `node ace generate:manifest` afterwards.
     */
    stayAlive: false,
  }

  public async run() {
    const { validateEmail } = await import('App/helpers/functions')
    const { default: Admin } = await import('App/Models/Admin')

    // Name
    const name = await this.prompt.ask('Enter Name', {
      validate(answer) {
        if (answer.length < 2) {
          return "Name must be at least 3 characters"
        }
        return true
      },
    })

    // Email
    const email = await this.prompt.ask('Enter email', {
      async validate(answer) {
        if (!validateEmail(answer)) {
          return "Email is not valid"
        }
        if (await Admin.findBy('email', answer)) {
          return "Email already exits!"
        }
        return true
      },
    })

    // Password
    const password = await this.prompt.secure('Choose account password', {
      validate(answer) {
        if (answer.length < 6) {
          return "Name must have to be at least 6 character"
        }
        return true
      },
    })

    // Confirm
    await this.prompt.secure('Confirm Password', {
      validate(answer) {
        if (answer !== password) {
          return "Password dosen't match"
        }
        return true
      },
    })

    try {
      await Admin.create({ name, email, password })
      this.logger.success('Admin Created Successfully')
      await this.exit()
    } catch (error) {
      console.log(error)

      this.logger.error(new Error('Request Fail'))
      await this.exit()
    }
  }
}