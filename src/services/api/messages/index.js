import { webApi } from '../config'

class MessagesApi {
  getAll = params => webApi({ auth: true }).get(`/messages`)

  // create = body => webApi({ auth: true }).post(`/messages`, body)

  getById = id => webApi({ auth: true }).get(`/messages/${id}`)

  // update = (id, body) => webApi({ auth: true }).put(`/messages/${id}`, body)
  // delete = id => webApi({ auth: true }).delete(`/messages/${id}`)
}

export const messagesApi = new MessagesApi()
