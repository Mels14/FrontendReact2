import api from "../interceptors/axiosInterceptor";

export const getEvaluations = async () => {
  try {
    const response = await api.get("/evaluation/evaluations");
    return response.data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createEvaluation = async (data: any) => {
  try {
    const response = await api.post("/evaluation/evaluations", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateEvaluation = async (id: string, data: any) => {
  try {
    const response = await api.put(`/evaluation/evaluations/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteEvaluation = async (id: string) => {
  try {
    const response = await api.delete(`/evaluation/evaluations/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const associateRubric = async (evaluationId: string, rubricId: string) => {
  try {
    const response = await api.patch(`/evaluation/evaluations/${evaluationId}/associate-rubric/${rubricId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};