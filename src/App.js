import "./App.css";
import axios from "axios";
import Loading from "./Loading";
import { useState, useEffect } from "react";
import Search from "./Search";
import ListPage from "./ListPage";

function App() {
  const [loaded, setLoaded] = useState(false);
  const [salesLocations, setSalesLocations] = useState([]);
  const [lettingsLocations, setLettingsLocations] = useState([]);
  const [salesTypes, setSalesTypes] = useState([]);
  const [lettingsTypes, setLettingsTypes] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://api-beta.estateapps.co.uk/v2/property/location?transaction-type=1&api-key=xYfyViCWX3ghasznzOK3jWwFhLtDRrUN`
      )
      .then((res) => {
        const response = res.data;
        const locations = response.data.Data;
        setSalesLocations(locations);
      })
      .catch((err) => setError(true));
    axios
      .get(
        `https://api-beta.estateapps.co.uk/v2/property/location?transaction-type=2&api-key=xYfyViCWX3ghasznzOK3jWwFhLtDRrUN`
      )
      .then((res) => {
        const response = res.data;
        const locations = response.data.Data;
        setLettingsLocations(locations);
      })
      .catch((err) => setError(true));
    axios
      .get(
        `https://api-beta.estateapps.co.uk/v2/property/type?transaction-type=1&api-key=xYfyViCWX3ghasznzOK3jWwFhLtDRrUN`
      )
      .then((res) => {
        const response = res.data;
        const types = response.data.Data;
        let typesReal = [];
        for (let i = 0; i < types.length; ++i) {
          typesReal.push(types[i].Name);
        }
        setSalesTypes(types ? typesReal : []);
      })
      .catch((err) => setError(true));
    axios
      .get(
        `https://api-beta.estateapps.co.uk/v2/property/type?transaction-type=2&api-key=xYfyViCWX3ghasznzOK3jWwFhLtDRrUN`
      )
      .then((res) => {
        const response = res.data;
        const types = response.data.Data;
        let typesReal = [];
        for (let i = 0; i < types.length; ++i) {
          typesReal.push(types[i].Name);
        }
        setLettingsTypes(types ? typesReal : []);
      })
      .catch((err) => setError(true));
    setLoaded(true);
  }, []);

  return loaded ? (
    <Search
      salesLocations={salesLocations}
      lettingsLocations={lettingsLocations}
      salesTypes={salesTypes}
      lettingsTypes={lettingsTypes}
      error={error}
    />
  ) : (
    // <ListPage />
    <Loading />
  );
}

export default App;
