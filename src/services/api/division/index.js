import { webApi } from '../config';

class DivisionApi {
  getAll = () => webApi({ auth: true }).get(`/division/`);
  getMine = () => webApi({ auth: true }).get(`/division/mine/`);
}

export const divisionApi = new DivisionApi();
