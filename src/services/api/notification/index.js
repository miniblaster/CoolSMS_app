import { webApi } from '../config';

class NotificationApi {
  getAll = () => webApi({ auth: true }).get(`/notifications/`);
  getRead = () => webApi({ auth: true }).get(`/notifications/read/`);
  getUnread = () => webApi({ auth: true }).get(`/notifications/unread/`);
  getById = (id) => webApi({ auth: true }).get(`/notifications/${id}/`);
  markAsRead = (id) => webApi({ auth: true }).post(`/notifications/${id}/mark_as_read/`);
  markAsUnread = (id) => webApi({ auth: true }).post(`/notifications/${id}/mark_as_unread/`);
  markAllAsRead = () => webApi({ auth: true }).post(`/notifications/mark_all_as_read/`);
}

export const notificationApi = new NotificationApi();
