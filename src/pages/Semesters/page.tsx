import ListSemesters from "../../components/Semesters/ListSemesters";
import Breadcrumb from "../../components/Breadcrumb";

const SemestersPage = () => {
  return (
    <>
      <Breadcrumb pageName="Semestres" />
      <ListSemesters />
    </>
  );
};

export default SemestersPage;