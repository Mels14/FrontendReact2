import { Edit, Trash2, Eye, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { getRubrics, deleteRubric, publishRubric } from "../../services/rubricsService";
import { getCriteria, createCriterion, deleteCriterion } from "../../services/criteriaService";
import { getScales, createScale, deleteScale } from "../../services/scalesService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ListRubrics = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  const [criteria, setCriteria] = useState<any[]>([]);
  const [scales, setScales] = useState<any[]>([]);
  const [rubricSeleccionada, setRubricSeleccionada] = useState<any | null>(null);
  const [criterionSeleccionado, setCriterionSeleccionado] = useState<any | null>(null);
  const [showCriterionForm, setShowCriterionForm] = useState(false);
  const [showScaleForm, setShowScaleForm] = useState(false);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    const [rubrics, crit, scal] = await Promise.all([
      getRubrics(),
      getCriteria(),
      getScales(),
    ]);
    setData(rubrics);
    setCriteria(crit);
    setScales(scal);
  };

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Eliminar rúbrica",
      text: "¿Está seguro de querer eliminar esta rúbrica?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteRubric(id);
          Swal.fire("Eliminado", "La rúbrica ha sido eliminada", "success");
          if (rubricSeleccionada?.id === id) setRubricSeleccionada(null);
          fetchData();
        } catch (error) {
          Swal.fire("Error", "No se pudo eliminar la rúbrica", "error");
        }
      }
    });
  };

  const handlePublish = async (id: string) => {
    Swal.fire({
      title: "Publicar rúbrica",
      text: "¿Está seguro de querer publicar esta rúbrica?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, publicar",
      cancelButtonText: "No"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await publishRubric(id);
          Swal.fire("Publicado", "La rúbrica ha sido publicada", "success");
          fetchData();
        } catch (error: any) {
          Swal.fire("Error", error.message || "No se pudo publicar la rúbrica", "error");
        }
      }
    });
  };

  const handleDeleteCriterion = async (id: string) => {
    if (!confirm("¿Eliminar este criterio?")) return;
    try {
      await deleteCriterion(id);
      if (criterionSeleccionado?.id === id) setCriterionSeleccionado(null);
      fetchData();
    } catch (error) {
      alert("No se pudo eliminar el criterio");
    }
  };

  const handleDeleteScale = async (id: string) => {
    if (!confirm("¿Eliminar esta escala?")) return;
    try {
      await deleteScale(id);
      fetchData();
    } catch (error) {
      alert("No se pudo eliminar la escala");
    }
  };

  const criteriosDeLaRubrica = criteria.filter(c => c.rubric_id === rubricSeleccionada?.id);
  const totalPeso = criteriosDeLaRubrica.reduce((sum, c) => sum + c.weight, 0);
  const escalasDeCriterio = scales.filter(s => s.criterion_id === criterionSeleccionado?.id);

  return (
    <div className="grid grid-cols-1 gap-9">
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark flex justify-between items-center">
            <h3 className="font-medium text-black dark:text-white">Rúbricas</h3>
            <a href="/rubricas/crear" className="bg-primary text-white px-4 py-2 rounded-md text-sm">
              + Nueva rúbrica
            </a>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">Título</th>
                    <th className="px-6 py-3">Descripción</th>
                    <th className="px-6 py-3">Pública</th>
                    <th className="px-6 py-3">Publicada</th>
                    <th className="px-6 py-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id} className={`border-b border-gray-200 ${rubricSeleccionada?.id === item.id ? 'bg-green-50' : 'odd:bg-white even:bg-gray-50'}`}>
                      <td className="px-6 py-4 font-medium text-gray-900">{item.title}</td>
                      <td className="px-6 py-4">{item.description}</td>
                      <td className="px-6 py-4">{item.is_public ? 'Sí' : 'No'}</td>
                      <td className="px-6 py-4">{item.is_archived ? 'Sí' : 'No'}</td>
                      <td className="px-6 py-4 space-x-2 flex">
                        <button onClick={() => { setRubricSeleccionada(item); setCriterionSeleccionado(null); }} className="text-blue-600">
                          <Eye size={20} />
                        </button>
                        <button onClick={() => navigate(`/rubricas/editar/${item.id}`)} className="text-yellow-600">
                          <Edit size={20} />
                        </button>
                        {!item.is_archived && (
                          <button onClick={() => handlePublish(item.id)} className="text-green-600">
                            <CheckCircle size={20} />
                          </button>
                        )}
                        <button onClick={() => handleDelete(item.id)} className="text-red-600">
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Criterios */}
        {rubricSeleccionada && (
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark flex justify-between items-center">
              <h3 className="font-medium text-black dark:text-white">Criterios de: {rubricSeleccionada.title}</h3>
              <button onClick={() => setShowCriterionForm(!showCriterionForm)} className="bg-primary text-white px-4 py-2 rounded-md text-sm">
                {showCriterionForm ? 'Cancelar' : '+ Nuevo criterio'}
              </button>
            </div>

            {totalPeso !== 100 ? (
              <p className="px-6 py-2 text-orange-500 text-sm">⚠️ Los pesos suman {totalPeso}%. Deben sumar exactamente 100% para publicar.</p>
            ) : (
              <p className="px-6 py-2 text-green-500 text-sm">✅ Los pesos suman 100%</p>
            )}

            {showCriterionForm && (
              <div className="p-6">
                <Formik
                  initialValues={{ name: '', description: '', weight: '' }}
                  validationSchema={Yup.object({
                    name: Yup.string().required("El nombre es obligatorio"),
                    weight: Yup.number().min(1).max(100).required("El peso es obligatorio"),
                  })}
                  onSubmit={async (values, { resetForm }) => {
                    try {
                      await createCriterion({ ...values, rubric_id: rubricSeleccionada.id, weight: Number(values.weight) });
                      resetForm();
                      setShowCriterionForm(false);
                      fetchData();
                    } catch (error) {
                      alert("Error al crear criterio");
                    }
                  }}
                >
                  {({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                      <Field name="name" placeholder="Nombre del criterio" className="w-full border rounded-md p-2" />
                      <ErrorMessage name="name" component="p" className="text-red-500 text-sm" />
                      <Field name="description" placeholder="Descripción" className="w-full border rounded-md p-2" />
                      <Field type="number" name="weight" placeholder="Peso (%)" className="w-full border rounded-md p-2" />
                      <ErrorMessage name="weight" component="p" className="text-red-500 text-sm" />
                      <button type="submit" style={{ backgroundColor: '#3b82f6' }} className="w-full py-2 px-4 text-white rounded-md">
                        Guardar criterio
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            )}

            <div className="p-6">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">Nombre</th>
                    <th className="px-6 py-3">Descripción</th>
                    <th className="px-6 py-3">Peso</th>
                    <th className="px-6 py-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {criteriosDeLaRubrica.length === 0 ? (
                    <tr><td colSpan={4} className="px-6 py-4 text-center">No hay criterios</td></tr>
                  ) : (
                    criteriosDeLaRubrica.map(c => (
                      <tr key={c.id} className={`border-b border-gray-200 ${criterionSeleccionado?.id === c.id ? 'bg-blue-50' : 'odd:bg-white even:bg-gray-50'}`}>
                        <td className="px-6 py-4">{c.name}</td>
                        <td className="px-6 py-4">{c.description}</td>
                        <td className="px-6 py-4">{c.weight}%</td>
                        <td className="px-6 py-4 space-x-2 flex">
                          <button onClick={() => { setCriterionSeleccionado(c); setShowScaleForm(false); }} className="text-blue-600">
                            <Eye size={20} />
                          </button>
                          <button onClick={() => handleDeleteCriterion(c.id)} className="text-red-600">
                            <Trash2 size={20} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Escalas */}
        {criterionSeleccionado && (
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark flex justify-between items-center">
              <h3 className="font-medium text-black dark:text-white">Escalas de: {criterionSeleccionado.name}</h3>
              <button onClick={() => setShowScaleForm(!showScaleForm)} className="bg-primary text-white px-4 py-2 rounded-md text-sm">
                {showScaleForm ? 'Cancelar' : '+ Nueva escala'}
              </button>
            </div>

            {showScaleForm && (
              <div className="p-6">
                <Formik
                  initialValues={{ name: '', description: '', value: '' }}
                  validationSchema={Yup.object({
                    name: Yup.string().required("El nombre es obligatorio"),
                    value: Yup.number().min(0).required("El valor es obligatorio"),
                  })}
                  onSubmit={async (values, { resetForm }) => {
                    try {
                      await createScale({ ...values, criterion_id: criterionSeleccionado.id, value: Number(values.value) });
                      resetForm();
                      setShowScaleForm(false);
                      fetchData();
                    } catch (error) {
                      alert("Error al crear escala");
                    }
                  }}
                >
                  {({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                      <Field name="name" placeholder="Nombre (ej: Excelente)" className="w-full border rounded-md p-2" />
                      <ErrorMessage name="name" component="p" className="text-red-500 text-sm" />
                      <Field name="description" placeholder="Descripción" className="w-full border rounded-md p-2" />
                      <Field type="number" name="value" placeholder="Valor (ej: 100)" className="w-full border rounded-md p-2" />
                      <ErrorMessage name="value" component="p" className="text-red-500 text-sm" />
                      <button type="submit" style={{ backgroundColor: '#3b82f6' }} className="w-full py-2 px-4 text-white rounded-md">
                        Guardar escala
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            )}

            <div className="p-6">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">Nombre</th>
                    <th className="px-6 py-3">Descripción</th>
                    <th className="px-6 py-3">Valor</th>
                    <th className="px-6 py-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {escalasDeCriterio.length === 0 ? (
                    <tr><td colSpan={4} className="px-6 py-4 text-center">No hay escalas</td></tr>
                  ) : (
                    escalasDeCriterio.map(s => (
                      <tr key={s.id} className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                        <td className="px-6 py-4">{s.name}</td>
                        <td className="px-6 py-4">{s.description}</td>
                        <td className="px-6 py-4">{s.value}</td>
                        <td className="px-6 py-4">
                          <button onClick={() => handleDeleteScale(s.id)} className="text-red-600">
                            <Trash2 size={20} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListRubrics;