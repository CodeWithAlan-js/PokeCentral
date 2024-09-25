import { useEffect, useState } from "react";
import { fetchBerriesData } from "../../services/berriesApi";
import "@styles/BerriesDetails.css";
import { capitalizeFirstLetter } from "../../helpers/utils";
import { MutatingDots } from "react-loader-spinner";

const BerriesDetails = () => {
  const [loading, setLoading] = useState(false);
  const [allBerriesDetails, setAllBerriesDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { combinedData } = await fetchBerriesData();
        setAllBerriesDetails(combinedData);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="berries-container">
      {loading ? (
        <div className="loader-container">
          <MutatingDots
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="three-dots-loading"
            wrapperStyle={{ textAlign: "center" }}
          />
        </div>
      ) : (
        <ul className="ul-berries">
          {allBerriesDetails.map((berry, index) => (
            <li className="li-berries" key={index}>
              <img src={berry.sprite} alt="Berry Sprite" />
              <h3>Name: {capitalizeFirstLetter(berry.details.name)}</h3>
              <p>Growth time: {berry.details.growth_time}</p>
              <p>Max harvest: {berry.details.max_harvest}</p>
              <p>Natural gift power: {berry.details.natural_gift_power}</p>
              <p>{berry.effect}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BerriesDetails;
