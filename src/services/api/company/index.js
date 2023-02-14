import { webApi } from '../config';

class CompanyApi {
  getAll = () => webApi({ auth: true }).get(`/company/`);
}

export const companyApi = new CompanyApi();
