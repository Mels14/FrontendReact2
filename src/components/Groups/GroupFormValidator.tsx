import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { getSemesters } from "../../services/semestersService";
import { getSubjects } from "../../services/subjectsService";
import { getUsers } from "../../services/userService";

interface GroupFormProps {
  mode: number;
  handleCreate?: (values: any) => void;
  handleUpdate?: (values: any) => void;
  group?: any | null;
}

const GroupFormValidator: React.FC<GroupFormProps> = ({ mode, handleCreate, handleUpdate, group }) => {
  const [semesters, setSemesters] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [semData, subData, usersData] = await Promise.all([
        getSemesters(),
        getSubjects(),
        getUsers(),
      ]);
      setSemesters(semData);
      setSubjects(subData);
      setTeachers(usersData.filter((u: any) => u.role === 'TEACHER'));
    };
    fetchData();
  }, []);

  const handleSubmit = (values: any) => {
    if (mode === 1 && handleCreate) handleCreate(values);
    else if (mode === 2 && handleUpdate) handleUpdate(values);
  };

  return (
    <Formik
      initialValues={group ? {
        name: group.name || '',
        group_code: group.group_code || '',
        capacity: group.capacity || 30,
        semester_id: group.semester_id || '',
        subject_id: group.subject_id || '',
        teacher_id: group.teacher_id || '',
      } : {
        name: '',
        group_code: '',
        capacity: 30,
        semester_id: '',
        subject_id: '',
        teacher_id: '',
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("El nombre es obligatorio"),
        group_code: Yup.string().required("El código es obligatorio"),
        capacity: Yup.number().min(1, "Mínimo 1").required("La capacidad es obligatoria"),
        semester_id: Yup.string().required("El semestre es obligatorio"),
        subject_id: Yup.string().required("La asignatura es obligatoria"),
        teacher_id: Yup.string().required("El docente es obligatorio"),
      })}
      onSubmit={(values) => handleSubmit({ ...values, capacity: Number(values.capacity) })}
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
            <Field type="text" name="group_code" className="w-full border rounded-md p-2" />
            <ErrorMessage name="group_code" component="p" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Capacidad</label>
            <Field type="number" name="capacity" className="w-full border rounded-md p-2" />
            <ErrorMessage name="capacity" component="p" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Semestre</label>
            <Field as="select" name="semester_id" className="w-full border rounded-md p-2">
              <option value="">Seleccione un semestre</option>
              {semesters.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </Field>
            <ErrorMessage name="semester_id" component="p" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Asignatura</label>
            <Field as="select" name="subject_id" className="w-full border rounded-md p-2">
              <option value="">Seleccione una asignatura</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </Field>
            <ErrorMessage name="subject_id" component="p" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Docente</label>
            <Field as="select" name="teacher_id" className="w-full border rounded-md p-2">
              <option value="">Seleccione un docente</option>
              {teachers.map((t) => (
                <option key={t.profile?.id} value={t.profile?.id}>
                  {t.profile?.first_name} {t.profile?.last_name}
                </option>
              ))}
            </Field>
            <ErrorMessage name="teacher_id" component="p" className="text-red-500 text-sm" />
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

export default GroupFormValidator;