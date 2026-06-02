import api from "../interceptors/axiosInterceptor";

export const getEnrollments = async () => {
  try {
    const response = await api.get("/academic/enrollments");
    return response.data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createEnrollment = async (data: any) => {
  try {
    const response = await api.post("/academic/enrollments", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};