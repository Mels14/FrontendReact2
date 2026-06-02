import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { getCareers } from "../../services/careersService";

interface SemesterFormProps {
  mode: number;
  handleCreate?: (values: any) => void;
  handleUpdate?: (values: any) => void;
  semester?: any | null;
}

const SemesterFormValidator: React.FC<SemesterFormProps> = ({ mode, handleCreate, handleUpdate, semester }) => {
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
      initialValues={semester ? {
        name: semester.name || '',
        code: semester.code || '',
        start_date: semester.start_date || '',
        end_date: semester.end_date || '',
        is_active: semester.is_active ?? false,
        career_id: '',
      } : {
        name: '',
        code: '',
        start_date: '',
        end_date: '',
        is_active: false,
        career_id: '',
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("El nombre es obligatorio"),
        code: Yup.string().required("El código es obligatorio"),
        career_id: Yup.string().required("La carrera es obligatoria"),
        start_date: Yup.string().required("La fecha de inicio es obligatoria"),
        end_date: Yup.string().required("La fecha de fin es obligatoria"),
      })}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">

          <div>
            <label className="block text-lg font-medium text-gray-700">Nombre</label>
            <Field type="text" name="name" className="w-full border rounded-md p-2" />
            <ErrorMessage name="name" component="p" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Código</label>
            <Field type="text" name="code" className="w-full border rounded-md p-2" />
            <ErrorMessage name="code" component="p" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Carrera</label>
            <Field as="select" name="career_id" className="w-full border rounded-md p-2">
              <option value="">Seleccione una carrera</option>
              {careers.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </Field>
            {mode === 2 && <p style={{ color: 'orange', fontSize: '12px' }}>⚠️ Selecciona la carrera para guardar cambios</p>}
            <ErrorMessage name="career_id" component="p" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Fecha inicio</label>
            <Field type="date" name="start_date" className="w-full border rounded-md p-2" />
            <ErrorMessage name="start_date" component="p" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Fecha fin</label>
            <Field type="date" name="end_date" className="w-full border rounded-md p-2" />
            <ErrorMessage name="end_date" component="p" className="text-red-500 text-sm" />
          </div>

          <div className="flex items-center gap-2">
            <Field type="checkbox" name="is_active" />
            <label className="text-lg font-medium text-gray-700">Activo</label>
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

export default SemesterFormValidator;
