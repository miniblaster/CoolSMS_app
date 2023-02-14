import { webApi } from 'api/config';

class RequestApi {
  getAll = () => webApi({ auth: true }).get(`/transfers/requests/`);
  create = (body) => webApi({ auth: true }).post(`/transfers/requests/`, body);
  update = (id, body) => webApi({ auth: true }).put(`/transfers/requests/${id}/`, body);
  delete = (id) => webApi({ auth: true }).delete(`/transfers/requests/${id}/`);

  createBulk = (body) => webApi({ auth: true }).put(`/transfers/requests/bulk/`, body);
}

export const requestApi = new RequestApi();
