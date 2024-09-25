import NavBar from "../components/common/navBar";
import TypesTable from "../components/common/TypesTable";
import "@styles/TypeTablePage.css";

const TypeTablePage = () => {
  return (
    <>
      <NavBar />
      <div className="type-table-page-container">
        <h2>Types and Damage Relations</h2>
        <TypesTable />
      </div>
    </>
  );
};

export default TypeTablePage;
