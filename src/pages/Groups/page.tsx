import ListGroups from "../../components/Groups/ListGroups";
import Breadcrumb from "../../components/Breadcrumb";

const GroupsPage = () => {
  return (
    <>
      <Breadcrumb pageName="Grupos" />
      <ListGroups />
    </>
  );
};

export default GroupsPage;