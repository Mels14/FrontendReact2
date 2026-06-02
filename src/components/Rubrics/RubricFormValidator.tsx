import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface RubricFormProps {
  mode: number;
  handleCreate?: (values: any) => void;
  handleUpdate?: (values: any) => void;
  rubric?: any | null;
}

const RubricFormValidator: React.FC<RubricFormProps> = ({ mode, handleCreate, handleUpdate, rubric }) => {

  const handleSubmit = (values: any) => {
    if (mode === 1 && handleCreate) handleCreate(values);
    else if (mode === 2 && handleUpdate) handleUpdate(values);
  };

  return (
    <Formik
      initialValues={rubric ? {
        title: rubric.title || '',
        description: rubric.description || '',
        is_public: rubric.is_public ?? false,
        is_archived: rubric.is_archived ?? false,
      } : {
        title: '',
        description: '',
        is_public: false,
        is_archived: false,
      }}
      validationSchema={Yup.object({
        title: Yup.string().required("El título es obligatorio"),
      })}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">

          <div>
            <label className="block text-lg font-medium text-gray-700">Título</label>
            <Field type="text" name="title" className="w-full border rounded-md p-2" />
            <ErrorMessage name="title" component="p" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Descripción</label>
            <Field type="text" name="description" className="w-full border rounded-md p-2" />
          </div>

          <div className="flex items-center gap-2">
            <Field type="checkbox" name="is_public" />
            <label className="text-lg font-medium text-gray-700">Pública</label>
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

export default RubricFormValidator;