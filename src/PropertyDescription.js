import "./App.css";
import * as React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Typography from "@mui/material/Typography";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import GoogleMaps from "./GoogleMaps";

function convertToPlain(html) {
  var tempDivElement = document.createElement("div");
  tempDivElement.innerHTML = html;
  var text = tempDivElement.textContent || tempDivElement.innerText || "";
  return text;
}

function PropertyDescription({ propertyData, setPropertyData }) {
  const onDownload = () => {
    let linkFromAPI = "";
    for (let i = 0; i < propertyData.Media.length; ++i) {
      if (propertyData.Media[i].TypeId == 5) {
        linkFromAPI = propertyData.FileUrl[3] + propertyData.Media[i].Data;
      }
    }
    const link = document.createElement("a");
    link.download = `brochure.png`;
    link.href = linkFromAPI;
    link.click();
  };

  return (
    <div style={{ backgroundColor: "white" }}>
      <div className="container">
        <div style={{ color: "black" }}>
          <p>
            <ArrowBackIosIcon
              style={{ cursor: "pointer" }}
              onClick={() => setPropertyData(null)}
            />
          </p>
          {propertyData.FileUrl.MainPhoto === "" ? (
            <CardMedia
              component="img"
              height="180"
              image="http://www.worldmartjb.com/website/theme/wp-content/uploads/2013/08/default_ppt.jpg"
              alt="default estate image"
            />
          ) : (
            <CardMedia
              component="img"
              height="180"
              image={
                propertyData.FileUrl.MainPhoto + propertyData.MainPhoto.Name
              }
              alt="image from database"
            />
          )}
          <Typography gutterBottom variant="h5" component="div">
            {propertyData.Bedrooms && propertyData.Bedrooms > 0
              ? propertyData.Bedrooms
              : "unknown"}{" "}
            bed{" "}
            {propertyData.Types[0].Id !== 0 ? propertyData.Types[0].Name : ""}{" "}
            {propertyData.TransactionTypeId === 1 ? "for sale" : "to rent"} in{" "}
            {propertyData.Address.Street && propertyData.Address.Street !== ""
              ? propertyData.Address.Street
              : ""}
            ,{" "}
            {propertyData.Address.Town && propertyData.Address.Town !== ""
              ? propertyData.Address.Town
              : ""}
          </Typography>
          <p>${propertyData.Price}</p>
          <Typography variant="body2" color="text.secondary">
            <span style={{ padding: "10px" }}>
              <BedIcon /> {propertyData.Bathrooms}
            </span>
            <span>
              <BathtubIcon /> {propertyData.Bedrooms}
            </span>
          </Typography>
          <p>{convertToPlain(propertyData.Description)}</p>
          <Typography gutterBottom variant="h6" component="div">
            Property Images
          </Typography>
          {propertyData.Media.map((media) =>
            media.TypeId == 1 ? (
              <CardMedia
                component="img"
                height="180"
                image={propertyData.FileUrl[1] + media.Data}
                alt="image from database"
              />
            ) : (
              <></>
            )
          )}
          {propertyData.Media.map((media) =>
            media.TypeId == 2 ? (
              <CardMedia
                component="img"
                height="180"
                image={propertyData.FileUrl[2] + media.Data}
                alt="image from database"
              />
            ) : (
              <></>
            )
          )}
          <Typography gutterBottom variant="h6" component="div">
            Map
          </Typography>
          <GoogleMaps
            latitude={propertyData.Address.Latitude}
            longitude={propertyData.Address.Longitude}
          />
          <Typography gutterBottom variant="h6" component="div">
            EPC
          </Typography>
          {propertyData.Media.map((media, index) =>
            media.TypeId == 3 ? (
              <CardMedia
                component="img"
                height="180"
                image={propertyData.FileUrl[3] + media.Data}
                alt="image from database"
                key={index}
              />
            ) : (
              <></>
            )
          )}
          <Typography gutterBottom variant="h6" component="div">
            Brochure
          </Typography>
          <Button variant="contained" onClick={onDownload}>
            Download Brochure
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PropertyDescription;
