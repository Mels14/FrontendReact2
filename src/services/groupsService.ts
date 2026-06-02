import api from "../interceptors/axiosInterceptor";

export const getGroups = async () => {
  try {
    const response = await api.get("/academic/groups");
    return response.data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createGroup = async (data: any) => {
  try {
    const response = await api.post("/academic/groups", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateGroup = async (id: string, data: any) => {
  try {
    const response = await api.put(`/academic/groups/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteGroup = async (id: string) => {
  try {
    const response = await api.delete(`/academic/groups/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const assignTeacher = async (groupId: string, teacherId: string) => {
  try {
    const response = await api.patch(`/academic/groups/${groupId}/assign-teacher/${teacherId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};