import { webApi } from 'api/config';

class HistoryApi {
  getAll = () => webApi({ auth: true }).get(`/transfers/history/`);
}

export const historyApi = new HistoryApi();
