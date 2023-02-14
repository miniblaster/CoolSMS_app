import { webApi } from 'api/config';

class QueueApi {
  getAll = () => webApi({ auth: true }).get(`/transfers/queue/`);
  push = (body) => webApi({ auth: true }).post(`/transfers/queue/`, body);
  pop = (id) => webApi({ auth: true }).delete(`/transfers/queue/${id}/`);
  update = (id, body) => webApi({ auth: true }).put(`/transfers/queue/${id}/`, body);

  createBulk = (body) => webApi({ auth: true }).put(`/transfers/queue/bulk/`, body);
}

export const queueApi = new QueueApi();
