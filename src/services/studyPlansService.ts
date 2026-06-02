import api from "../interceptors/axiosInterceptor";

export const getStudyPlans = async () => {
  try {
    const response = await api.get("/academic/study-plans");
    return response.data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createStudyPlan = async (data: any) => {
  try {
    const response = await api.post("/academic/study-plans", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateStudyPlan = async (id: string, data: any) => {
  try {
    const response = await api.put(`/academic/study-plans/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteStudyPlan = async (id: string) => {
  try {
    const response = await api.delete(`/academic/study-plans/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getStudyPlanSubjects = async (planId: string) => {
  try {
    const response = await api.get(`/academic/study-plans/${planId}/subjects`);
    return response.data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const linkSubjectToPlan = async (planId: string, subjectId: string) => {
  try {
    const response = await api.post(`/academic/study-plans/${planId}/subjects/${subjectId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const unlinkSubjectFromPlan = async (planId: string, subjectId: string) => {
  try {
    const response = await api.delete(`/academic/study-plans/${planId}/subjects/${subjectId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};