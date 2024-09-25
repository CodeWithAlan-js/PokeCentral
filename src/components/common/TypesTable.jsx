import { useState, useEffect } from "react";
import "@styles/TypesTable.css";
import { typeColors, capitalizeFirstLetter } from "../../helpers/utils";
import { MutatingDots } from "react-loader-spinner";
import { allTypesApi } from "../../services/typesApi";

const TypesTable = () => {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTypes = async () => {
      setLoading(true);
      const typeData = await allTypesApi();
      setLoading(false);
      setTypes(typeData);
    };
    fetchTypes();
  }, []);

  const addSlashIfEmpty = (array) => {
    return array.length
      ? array.map((item) => capitalizeFirstLetter(item.name)).join(", ")
      : "/";
  };

  const filteredTypes = types.filter(
    (type) => type.name !== "unknown" && type.name !== "shadow"
  );

  return (
    <>
      {loading && (
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
      )}
      <div className="table-container">
        <table>
          <thead className="thead-type">
            <tr>
              <th>Type</th>
              <th>No Damage To</th>
              <th>Half Damage To</th>
              <th>Double Damage To</th>
            </tr>
          </thead>
          <tbody>
            {filteredTypes.map((type) => (
              <tr key={type.name}>
                <td className="type-name-container">
                  <p
                    className="test-p"
                    style={{ backgroundColor: typeColors[type.name] }}
                  >
                    {capitalizeFirstLetter(type.name)}
                  </p>
                </td>
                <td>
                  <p>{addSlashIfEmpty(type.damage_relations.no_damage_to)}</p>
                </td>
                <td>{addSlashIfEmpty(type.damage_relations.half_damage_to)}</td>
                <td>
                  {addSlashIfEmpty(type.damage_relations.double_damage_to)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TypesTable;
