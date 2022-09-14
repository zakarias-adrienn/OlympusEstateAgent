import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Sales from "./Sales";
import Lettings from "./Lettings";
import ListPage from "./ListPage";
import PropertyDescription from "./PropertyDescription";
import MuiAlert from "@mui/material/Alert";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Search({
  salesLocations,
  lettingsLocations,
  salesTypes,
  lettingsTypes,
  error,
}) {
  const [value, setValue] = React.useState(0);
  const [dataToShow, setDataToShow] = React.useState(null);
  const [typeSearch, setTypeSearch] = React.useState("");
  const [propertyData, setPropertyData] = React.useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ backgroundColor: "white" }}>
      <div className="container">
        <div className="dataText">
          <h1>OLYMPUS</h1>
          <h2>ESTATE AGENT</h2>
        </div>
        {error && (
          <div>
            <Alert severity="info">
              Sorry, no listings have been found matching the criteria you
              entered. Please try again using a broader criteria.
            </Alert>
            <br />
          </div>
        )}
        {dataToShow === null ? (
          <Box sx={{ padding: "10px" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Sales" {...a11yProps(0)} />
                <Tab label="Lettings" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Sales
                salesLocations={salesLocations}
                salesTypes={salesTypes}
                setDataToShow={setDataToShow}
                setTypeSearch={setTypeSearch}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Lettings
                lettingsLocations={lettingsLocations}
                lettingsTypes={lettingsTypes}
                setDataToShow={setDataToShow}
                setTypeSearch={setTypeSearch}
              />
            </TabPanel>
          </Box>
        ) : propertyData === null ? (
          <ListPage
            dataToShow={dataToShow}
            setDataToShow={setDataToShow}
            typeSearch={typeSearch}
            setPropertyData={setPropertyData}
          />
        ) : (
          <PropertyDescription
            propertyData={propertyData}
            setPropertyData={setPropertyData}
          />
        )}
      </div>
    </div>
  );
}
