import { RequestContract } from '@ioc:Adonis/Core/Request'

// Validate Email
export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

// Pagination Helper 
export const pagination = (request: RequestContract) => {
  const page = request.input('page', 1)
  const perPage = request.input('perPage', 25)

  return { page, perPage }
}