import ListStudyPlans from "../../components/StudyPlans/ListStudyPlans";
import Breadcrumb from "../../components/Breadcrumb";

const StudyPlansPage = () => {
  return (
    <>
      <Breadcrumb pageName="Plan de Estudios" />
      <ListStudyPlans />
    </>
  );
};

export default StudyPlansPage;