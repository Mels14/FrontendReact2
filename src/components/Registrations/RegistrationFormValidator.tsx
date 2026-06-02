import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { getCareers } from "../../services/careersService";
import { getUsers } from "../../services/userService";

interface RegistrationFormProps {
  mode: number;
  handleCreate?: (values: any) => void;
  handleUpdate?: (values: any) => void;
  registration?: any | null;
}

const RegistrationFormValidator: React.FC<RegistrationFormProps> = ({ mode, handleCreate, handleUpdate, registration }) => {
  const [careers, setCareers] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [careersData, usersData] = await Promise.all([
        getCareers(),
        getUsers(),
      ]);
      setCareers(careersData);
      setStudents(usersData.filter((u: any) => u.role === 'STUDENT'));
    };
    fetchData();
  }, []);

  const handleSubmit = (values: any) => {
    if (mode === 1 && handleCreate) handleCreate(values);
    else if (mode === 2 && handleUpdate) handleUpdate(values);
  };

  return (
    <Formik
      initialValues={registration ? {
        student_id: registration.student_id || '',
        career_id: registration.career_id || '',
        admission_period: registration.admission_period || '',
        academic_status: registration.academic_status || 'ACTIVE',
        is_active: registration.is_active ?? true,
      } : {
        student_id: '',
        career_id: '',
        admission_period: '',
        academic_status: 'ACTIVE',
        is_active: true,
      }}
      validationSchema={Yup.object({
        student_id: Yup.string().required("El estudiante es obligatorio"),
        career_id: Yup.string().required("La carrera es obligatoria"),
        admission_period: Yup.string().required("El período es obligatorio"),
        academic_status: Yup.string().required("El estado académico es obligatorio"),
      })}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">

          <div>
            <label className="block text-lg font-medium text-gray-700">Estudiante</label>
            <Field as="select" name="student_id" className="w-full border rounded-md p-2">
              <option value="">Seleccione un estudiante</option>
              {students.map((s) => (
                <option key={s.profile?.id} value={s.profile?.id}>
                  {s.profile?.first_name} {s.profile?.last_name} ({s.code})
                </option>
              ))}
            </Field>
            <ErrorMessage name="student_id" component="p" className="text-red-500 text-sm" />
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
            <label className="block text-lg font-medium text-gray-700">Período de admisión</label>
            <Field type="text" name="admission_period" placeholder="ej: 2026-1" className="w-full border rounded-md p-2" />
            <ErrorMessage name="admission_period" component="p" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Estado académico</label>
            <Field as="select" name="academic_status" className="w-full border rounded-md p-2">
              <option value="ACTIVE">Activo</option>
              <option value="INACTIVE">Inactivo</option>
              <option value="GRADUATED">Graduado</option>
            </Field>
          </div>

          <div className="flex items-center gap-2">
            <Field type="checkbox" name="is_active" />
            <label className="text-lg font-medium text-gray-700">Activa</label>
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

export default RegistrationFormValidator;