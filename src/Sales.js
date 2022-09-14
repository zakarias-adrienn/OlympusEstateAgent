import "./App.css";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import axios from "axios";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function Sales({ salesLocations, salesTypes, setDataToShow, setTypeSearch }) {
  const [personName, setPersonName] = React.useState([]);
  const [location, setLocation] = React.useState("All");
  const [maxPrice, setMaxPrice] = React.useState("No Max");
  const [bedrooms, setBedrooms] = React.useState(0);
  const [error, setError] = React.useState("");
  const [names, setNames] = React.useState([]);
  const [dictionaryTypes, setDictionaryTypes] = React.useState({});

  React.useEffect(() => {
    setNames([...names, ...salesTypes]);
    let newAll = {};
    for (let i = 0; i < salesTypes.length; ++i) {
      let copyFoo = {};
      copyFoo[salesTypes[i]] = i + 1;
      newAll = { ...newAll, ...copyFoo };
    }
    setDictionaryTypes(newAll);
  }, []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  const searchSales = () => {
    let params = ``;
    if (location !== "All") {
      params += `&location=${location}`;
    }
    if (maxPrice !== "No Max") {
      params += `&max-price=${maxPrice}`;
    }
    if (personName.length > 0) {
      params += `&type=`;
      for (let i = 0; i < personName.length; ++i) {
        params += `${dictionaryTypes[personName[i]]},`;
      }
      params = params.slice(0, -1);
    }
    if (bedrooms !== 0) {
      params += `&max-bed=${bedrooms}`;
    }
    let axiosQuery =
      `https://api-beta.estateapps.co.uk/v2/property/residential/sale?
    expand=MainPhoto,Address,Types&fields=Id,TransactionTypeId,Bedrooms,Bathrooms,Description,Price,Address.Street,Address.Town,Types.Id,Types.Name,Currency.Symbol` +
      params +
      `&api-key=xYfyViCWX3ghasznzOK3jWwFhLtDRrUN`;
    axios
      .get(axiosQuery)
      .then((res) => {
        setDataToShow(res.data.data.Data);
        setTypeSearch("sales");
      })
      .catch(function (error) {
        console.log("Show error notification!");
        setError(error);
      });
  };

  return (
    <>
      <FormControl fullWidth style={{ margin: "10px" }}>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Location
        </InputLabel>
        <NativeSelect
          defaultValue={"All"}
          inputProps={{
            name: "location",
            id: "uncontrolled-native",
          }}
          onChange={(event) => setLocation(event.target.value)}
        >
          <option value={0}>All</option>
          {salesLocations &&
            salesLocations.map((location) => (
              <option value={location}>{location}</option>
            ))}
        </NativeSelect>
      </FormControl>
      <FormControl fullWidth style={{ margin: "10px" }}>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Max price
        </InputLabel>
        <NativeSelect
          defaultValue={"No Max"}
          inputProps={{
            name: "max-price",
            id: "uncontrolled-native",
          }}
          onChange={(event) => setMaxPrice(event.target.value)}
        >
          <option value={"No Max"}>No Max</option>
          <option value={75000}>75000</option>
          <option value={100000}>100000</option>
          <option value={125000}>125000</option>
          <option value={150000}>150000</option>
          <option value={175000}>175000</option>
          <option value={200000}>200000</option>
          <option value={225000}>225000</option>
          <option value={250000}>250000</option>
          <option value={275000}>275000</option>
          <option value={300000}>300000</option>
          <option value={325000}>325000</option>
          <option value={350000}>350000</option>
          <option value={375000}>375000</option>
          <option value={400000}>400000</option>
          <option value={425000}>425000</option>
          <option value={450000}>450000</option>
          <option value={475000}>475000</option>
          <option value={500000}>500000</option>
          <option value={600000}>600000</option>
          <option value={700000}>700000</option>
          <option value={800000}>800000</option>
          <option value={900000}>900000</option>
          <option value={1000000}>1000000</option>
          <option value={1250000}>1250000</option>
          <option value={1500000}>1500000</option>
          <option value={1750000}>1750000</option>
          <option value={2000000}>2000000</option>
          <option value={2250000}>2250000</option>
          <option value={2500000}>2500000</option>
          <option value={2750000}>2750000</option>
          <option value={3000000}>3000000</option>
          <option value={4000000}>4000000</option>
          <option value={5000000}>5000000</option>
          <option value={6000000}>6000000</option>
          <option value={7000000}>7000000</option>
          <option value={8000000}>8000000</option>
          <option value={9000000}>9000000</option>
          <option value={10000000}>10000000</option>
        </NativeSelect>
      </FormControl>
      <FormControl fullWidth style={{ margin: "10px" }}>
        <InputLabel id="demo-multiple-checkbox-label">
          Type (default: any)
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth style={{ margin: "10px" }}>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Bedrooms
        </InputLabel>
        <NativeSelect
          inputProps={{
            name: "bedrooms",
            id: "uncontrolled-native",
          }}
          defaultValue={0}
          onChange={(event) => setBedrooms(event.target.value)}
        >
          <option value={0}>Any</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
        </NativeSelect>
      </FormControl>
      <Button variant="contained" onClick={() => searchSales()}>
        Search
      </Button>
      {error !== "" && <Alert severity="error">{error}</Alert>}
    </>
  );
}

export default Sales;
