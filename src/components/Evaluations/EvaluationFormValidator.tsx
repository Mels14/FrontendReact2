import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { getGroups } from "../../services/groupsService";
import { getSubjects } from "../../services/subjectsService";

interface EvaluationFormProps {
  mode: number;
  handleCreate?: (values: any) => void;
  handleUpdate?: (values: any) => void;
  evaluation?: any | null;
}

const EvaluationFormValidator: React.FC<EvaluationFormProps> = ({ mode, handleCreate, handleUpdate, evaluation }) => {
  const [groups, setGroups] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [grps, subs] = await Promise.all([getGroups(), getSubjects()]);
      setGroups(grps);
      setSubjects(subs);
    };
    fetchData();
  }, []);

  const handleSubmit = (values: any) => {
    if (mode === 1 && handleCreate) handleCreate(values);
    else if (mode === 2 && handleUpdate) handleUpdate(values);
  };

  return (
    <Formik
      initialValues={evaluation ? {
        name: evaluation.name || '',
        description: evaluation.description || '',
        weight: evaluation.weight || '',
        group_id: evaluation.group_id || '',
        subject_id: evaluation.subject_id || '',
      } : {
        name: '',
        description: '',
        weight: '',
        group_id: '',
        subject_id: '',
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("El nombre es obligatorio"),
        weight: Yup.number().min(1).max(100).required("El peso es obligatorio"),
        group_id: Yup.string().required("El grupo es obligatorio"),
        subject_id: Yup.string().required("La asignatura es obligatoria"),
      })}
      onSubmit={(values) => handleSubmit({ ...values, weight: Number(values.weight) })}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">

          <div>
            <label className="block text-lg font-medium text-gray-700">Nombre</label>
            <Field type="text" name="name" className="w-full border rounded-md p-2" />
            <ErrorMessage name="name" component="p" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Descripción</label>
            <Field type="text" name="description" className="w-full border rounded-md p-2" />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Peso (%)</label>
            <Field type="number" name="weight" className="w-full border rounded-md p-2" />
            <ErrorMessage name="weight" component="p" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Grupo</label>
            <Field as="select" name="group_id" className="w-full border rounded-md p-2">
              <option value="">Seleccione un grupo</option>
              {groups.map((g) => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </Field>
            <ErrorMessage name="group_id" component="p" className="text-red-500 text-sm" />
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

export default EvaluationFormValidator;