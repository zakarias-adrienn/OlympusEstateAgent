import "./App.css";
import PropertyCard from "./PropertyCard";
import MuiAlert from "@mui/material/Alert";
import * as React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Typography from "@mui/material/Typography";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ListPage({ dataToShow, setDataToShow, typeSearch, setPropertyData }) {
  return (
    <div style={{ backgroundColor: "white" }}>
      <div className="container">
        <div style={{ color: "black" }}>
          <Typography gutterBottom variant="h5" component="div">
            <ArrowBackIosIcon
              style={{ cursor: "pointer" }}
              onClick={() => setDataToShow(null)}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {dataToShow.length === 0
              ? "No properties found"
              : typeSearch === "sales"
              ? "Properties for Sale"
              : "Properties to Rent"}
          </Typography>
        </div>
        <div>
          {dataToShow.length == 0 ? (
            <div>
              <Alert severity="info">
                Sorry, no listings have been found matching the criteria you
                entered. Please try again using a broader criteria.
              </Alert>
              <br />
            </div>
          ) : (
            dataToShow.map((property) => (
              <PropertyCard
                data={property}
                typeSearch={typeSearch}
                setPropertyData={setPropertyData}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ListPage;
