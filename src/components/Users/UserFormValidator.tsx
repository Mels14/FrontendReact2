import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface MyFormProps {
  mode: number;
  handleCreate?: (values: any) => void;
  handleUpdate?: (values: any) => void;
  user?: any | null;
}

const UserFormValidator: React.FC<MyFormProps> = ({ mode, handleCreate, handleUpdate, user }) => {

  const handleSubmit = (values: any) => {
    if (mode === 1 && handleCreate) {
      handleCreate(values);
    } else if (mode === 2 && handleUpdate) {
      handleUpdate(values);
    }
  };

  return (
    <Formik
      initialValues={user ? {
        email: user.email || '',
        code: user.code || '',
        first_name: user.profile?.first_name || '',
        last_name: user.profile?.last_name || '',
        identification: user.profile?.identification || '',
        role: user.role || 'STUDENT',
        password: '',
      } : {
        email: '',
        password: '',
        code: '',
        role: 'STUDENT',
        first_name: '',
        last_name: '',
        identification: '',
      }}
      validationSchema={Yup.object({
        email: Yup.string().email("Email inválido").required("El email es obligatorio"),
        password: mode === 1
          ? Yup.string().min(8, "Mínimo 8 caracteres").required("La contraseña es obligatoria")
          : Yup.string(),
        code: Yup.string().required("El código es obligatorio"),
        role: Yup.string().required("El rol es obligatorio"),
        first_name: Yup.string().required("El nombre es obligatorio"),
        last_name: Yup.string().required("El apellido es obligatorio"),
        identification: Yup.string().when('role', {
          is: (role: string) => role !== 'ADMIN',
          then: (schema) => schema.required("La cédula es obligatoria"),
          otherwise: (schema) => schema.notRequired(),
        }),
      })}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ handleSubmit, values }) => (
          <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md overflow-y-auto max-h-screen">
          <div>
            <label className="block text-lg font-medium text-gray-700">Rol</label>
            <Field as="select" name="role" className="w-full border rounded-md p-2">
              <option value="STUDENT">Estudiante</option>
              <option value="TEACHER">Docente</option>
              <option value="ADMIN">Administrador</option>
            </Field>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Email</label>
            <Field type="text" name="email" className="w-full border rounded-md p-2" />
            <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
          </div>

          {mode === 1 && (
            <div>
              <label className="block text-lg font-medium text-gray-700">Contraseña</label>
              <Field type="password" name="password" className="w-full border rounded-md p-2" />
              <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />
            </div>
          )}

          <div>
            <label className="block text-lg font-medium text-gray-700">Código</label>
            <Field type="text" name="code" className="w-full border rounded-md p-2" />
            <ErrorMessage name="code" component="p" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Nombre</label>
            <Field type="text" name="first_name" className="w-full border rounded-md p-2" />
            <ErrorMessage name="first_name" component="p" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Apellido</label>
            <Field type="text" name="last_name" className="w-full border rounded-md p-2" />
            <ErrorMessage name="last_name" component="p" className="text-red-500 text-sm" />
          </div>

          {values.role !== 'ADMIN' && (
            <div>
              <label className="block text-lg font-medium text-gray-700">Cédula</label>
              <Field type="text" name="identification" className="w-full border rounded-md p-2" />
              <ErrorMessage name="identification" component="p" className="text-red-500 text-sm" />
            </div>
          )}

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

export default UserFormValidator;