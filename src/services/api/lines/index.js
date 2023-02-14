import { webApi } from '../config'

class LineApi {
  getAll = params => webApi({ auth: true }).get(`/lines`)
  create = body => webApi({ auth: true }).post(`/lines`, body)

  getById = id => webApi({ auth: true }).get(`/lines/${id}`)
  update = (id, body) => webApi({ auth: true }).put(`/lines/${id}`, body)
  delete = id => webApi({ auth: true }).delete(`/lines/${id}`)
}

export const lineApi = new LineApi()
