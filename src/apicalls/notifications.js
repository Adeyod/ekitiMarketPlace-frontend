import { axiosInstance } from './axiosInstance';

// ADD A NOTIFICATION
export const AddNotification = async (data) => {
  try {
    const response = await axiosInstance.post(
      '/api/notifications/notify',
      data
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// GET ALL NOTIFICATIONS BY USER
export const GetAllNotifications = async () => {
  try {
    const response = await axiosInstance.get(
      '/api/notifications/get-all-notifications'
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// DELETE NOTIFICATION BY ID
export const DeleteNotification = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/api/notifications/delete-notification/${id}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// READ ALL NOTIFICATIONS BY USER
export const ReadAllNotifications = async () => {
  try {
    const response = await axiosInstance.put(
      '/api/notifications/read-all-notifications'
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
