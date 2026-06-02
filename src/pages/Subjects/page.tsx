import ListSubjects from "../../components/Subjects/ListSubjects";
import Breadcrumb from "../../components/Breadcrumb";

const SubjectsPage = () => {
  return (
    <>
      <Breadcrumb pageName="Asignaturas" />
      <ListSubjects />
    </>
  );
};

export default SubjectsPage;