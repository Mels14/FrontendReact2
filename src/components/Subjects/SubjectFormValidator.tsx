import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface SubjectFormProps {
  mode: number;
  handleCreate?: (values: any) => void;
  handleUpdate?: (values: any) => void;
  subject?: any | null;
}

const SubjectFormValidator: React.FC<SubjectFormProps> = ({ mode, handleCreate, handleUpdate, subject }) => {

  const handleSubmit = (values: any) => {
    if (mode === 1 && handleCreate) handleCreate(values);
    else if (mode === 2 && handleUpdate) handleUpdate(values);
  };

  return (
    <Formik
      initialValues={subject ? {
        name: subject.name || '',
        code: subject.code || '',
        description: subject.description || '',
        credits: subject.credits || '',
        is_active: subject.is_active ?? true,
      } : {
        name: '',
        code: '',
        description: '',
        credits: '',
        is_active: true,
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("El nombre es obligatorio"),
        code: Yup.string().required("El código es obligatorio"),
        credits: Yup.number().min(1, "Mínimo 1 crédito").required("Los créditos son obligatorios"),
      })}
      onSubmit={(values) => handleSubmit({ ...values, credits: Number(values.credits) })}
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
            <label className="block text-lg font-medium text-gray-700">Descripción</label>
            <Field type="text" name="description" className="w-full border rounded-md p-2" />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Créditos</label>
            <Field type="number" name="credits" className="w-full border rounded-md p-2" />
            <ErrorMessage name="credits" component="p" className="text-red-500 text-sm" />
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

export default SubjectFormValidator;