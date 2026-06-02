import ListRegistrations from "../../components/Registrations/ListRegistrations";
import Breadcrumb from "../../components/Breadcrumb";

const RegistrationsPage = () => {
  return (
    <>
      <Breadcrumb pageName="Matrículas" />
      <ListRegistrations />
    </>
  );
};

export default RegistrationsPage;