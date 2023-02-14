import { webApi } from '../config';

class EquipmentApi {
  getAll = () => webApi({ auth: true }).get(`/equipment/`);

  create = (body) => webApi({ auth: true }).post(`/equipment/`, body);
  getById = (id) => webApi({ auth: true }).get(`/equipment/${id}/`);
  update = (id, body) => webApi({ auth: true }).put(`/equipment/${id}/`, body);
  delete = (id) => webApi({ auth: true }).delete(`/equipment/${id}/`);
}

export const equipmentApi = new EquipmentApi();
