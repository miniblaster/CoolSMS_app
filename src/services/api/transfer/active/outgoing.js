import { webApi } from 'api/config';

class OutgoingApi {
  getAll = () => webApi({ auth: true }).get(`/transfers/active/outgoing/`);
  create = (body) => webApi({ auth: true }).post(`/transfers/active/outgoing/`, body);
  update = (id, body) => webApi({ auth: true }).put(`/transfers/active/outgoing/${id}/`, body);
  delete = (id) => webApi({ auth: true }).delete(`/transfers/active/outgoing/${id}/`);

  createBulk = (body) => webApi({ auth: true }).put(`/transfers/active/outgoing/bulk/`, body);
}

export const outgoingApi = new OutgoingApi();
