import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface CareerFormProps {
  mode: number;
  handleCreate?: (values: any) => void;
  handleUpdate?: (values: any) => void;
  career?: any | null;
}

const CareerFormValidator: React.FC<CareerFormProps> = ({ mode, handleCreate, handleUpdate, career }) => {

  const handleSubmit = (values: any) => {
    if (mode === 1 && handleCreate) handleCreate(values);
    else if (mode === 2 && handleUpdate) handleUpdate(values);
  };

  return (
    <Formik
      initialValues={career ? {
        name: career.name || '',
        code: career.code || '',
        description: career.description || '',
        is_active: career.is_active ?? true,
      } : {
        name: '',
        code: '',
        description: '',
        is_active: true,
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("El nombre es obligatorio"),
        code: Yup.string().required("El código es obligatorio"),
        description: Yup.string(),
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
            <label className="block text-lg font-medium text-gray-700">Descripción</label>
            <Field type="text" name="description" className="w-full border rounded-md p-2" />
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

export default CareerFormValidator;