import BerriesDetails from "../components/common/berriesDetails";
import "@styles/BerriesPage.css";
import NavBar from "../components/common/navBar";

const BerriesPage = () => {
  return (
    <>
      <NavBar />
      <div className="berries-page-container">
        <h2>List Of Berries</h2>
        <BerriesDetails />
      </div>
    </>
  );
};

export default BerriesPage;
