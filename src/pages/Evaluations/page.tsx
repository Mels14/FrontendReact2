import ListEvaluations from "../../components/Evaluations/ListEvaluations";
import Breadcrumb from "../../components/Breadcrumb";

const EvaluationsPage = () => {
  return (
    <>
      <Breadcrumb pageName="Evaluaciones" />
      <ListEvaluations />
    </>
  );
};

export default EvaluationsPage;