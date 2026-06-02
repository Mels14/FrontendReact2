import ListGrades from "../../components/Grades/ListGrades";
import Breadcrumb from "../../components/Breadcrumb";

const GradesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Calificaciones" />
      <ListGrades />
    </>
  );
};

export default GradesPage;