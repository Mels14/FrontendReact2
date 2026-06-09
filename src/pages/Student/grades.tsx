import StudentGrades from "../../components/Student/StudentGrades";
import Breadcrumb from "../../components/Breadcrumb";

const StudentGradesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Mis Calificaciones" />
      <StudentGrades />
    </>
  );
};

export default StudentGradesPage;