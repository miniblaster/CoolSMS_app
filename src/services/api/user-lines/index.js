import { webApi } from '../config'

class UserLinesApi {
  getAll = params => webApi({ auth: true }).get(`/user-lines`)
  create = body => webApi({ auth: true }).post(`/user-lines`, body)

  getById = id => webApi({ auth: true }).get(`/user-lines/${id}`)
  update = (id, body) => webApi({ auth: true }).put(`/user-lines/${id}`, body)
  delete = id => webApi({ auth: true }).delete(`/user-lines/${id}`)
}

export const userLinesApi = new UserLinesApi()
