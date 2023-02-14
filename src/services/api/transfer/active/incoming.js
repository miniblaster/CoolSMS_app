import { webApi } from 'api/config';

class IncomingApi {
  getAll = () => webApi({ auth: true }).get(`/transfers/active/incoming/`);
  create = (body) => webApi({ auth: true }).post(`/transfers/active/incoming/`, body);
  update = (id, body) => webApi({ auth: true }).put(`/transfers/active/incoming/${id}/`, body);
  delete = (id) => webApi({ auth: true }).delete(`/transfers/active/incoming/${id}/`);

  createBulk = (body) => webApi({ auth: true }).put(`/transfers/active/incoming/bulk/`, body);
}

export const incomingApi = new IncomingApi();
