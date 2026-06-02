import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { getCareers } from "../../services/careersService";

interface StudyPlanFormProps {
  mode: number;
  handleCreate?: (values: any) => void;
  handleUpdate?: (values: any) => void;
  plan?: any | null;
}

const StudyPlanFormValidator: React.FC<StudyPlanFormProps> = ({ mode, handleCreate, handleUpdate, plan }) => {
  const [careers, setCareers] = useState<any[]>([]);

  useEffect(() => {
    const fetchCareers = async () => {
      const data = await getCareers();
      setCareers(data);
    };
    fetchCareers();
  }, []);

  const handleSubmit = (values: any) => {
    if (mode === 1 && handleCreate) handleCreate(values);
    else if (mode === 2 && handleUpdate) handleUpdate(values);
  };

  return (
    <Formik
      initialValues={plan ? {
        name: plan.name || '',
        career_id: plan.career_id || '',
        year: plan.year || '',
        suggested_semester: plan.suggested_semester || 1,
        is_published: plan.is_published ?? false,
      } : {
        name: '',
        career_id: '',
        year: '',
        suggested_semester: 1,
        is_published: false,
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("El nombre es obligatorio"),
        career_id: Yup.string().required("La carrera es obligatoria"),
        year: Yup.number().min(2000, "Año inválido").required("El año es obligatorio"),
        suggested_semester: Yup.number().min(1).max(10).required("El semestre sugerido es obligatorio"),
      })}
      onSubmit={(values) => handleSubmit({ ...values, year: Number(values.year) })}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">

          <div>
            <label className="block text-lg font-medium text-gray-700">Nombre</label>
            <Field type="text" name="name" className="w-full border rounded-md p-2" />
            <ErrorMessage name="name" component="p" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Carrera</label>
            <Field as="select" name="career_id" className="w-full border rounded-md p-2">
              <option value="">Seleccione una carrera</option>
              {careers.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </Field>
            <ErrorMessage name="career_id" component="p" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Año</label>
            <Field type="number" name="year" className="w-full border rounded-md p-2" />
            <ErrorMessage name="year" component="p" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Semestre sugerido</label>
            <Field type="number" name="suggested_semester" className="w-full border rounded-md p-2" />
            <ErrorMessage name="suggested_semester" component="p" className="text-red-500 text-sm" />
          </div>

          <div className="flex items-center gap-2">
            <Field type="checkbox" name="is_published" />
            <label className="text-lg font-medium text-gray-700">Publicado</label>
          </div>

          <div className="pb-4">
            <button
              type="submit"
              style={{ backgroundColor: mode === 1 ? '#3b82f6' : '#22c55e' }}
              className="w-full py-2 px-4 text-white rounded-md"
            >
              {mode === 1 ? "Crear" : "Actualizar"}
            </button>
          </div>

        </Form>
      )}
    </Formik>
  );
};

export default StudyPlanFormValidator;