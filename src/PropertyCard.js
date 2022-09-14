import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import axios from "axios";

function convertToPlain(html) {
  var tempDivElement = document.createElement("div");
  tempDivElement.innerHTML = html;
  var text = tempDivElement.textContent || tempDivElement.innerText || "";
  return text.substring(0, 100) + "...";
}

export default function PropertyCard({ data, typeSearch, setPropertyData }) {
  // todo: add pagination

  const showPropertyDetails = () => {
    console.log(data.Id);
    let axiosQuery;
    if (typeSearch === "sales") {
      axiosQuery = `https://api-beta.estateapps.co.uk/v2/property/residential/sale/${data.Id}?
    expand=MainPhoto,Address,Types,Media,Currency&fields=Id,TransactionTypeId,Bedrooms,Bathrooms,Description,Price,Address.Street,Address.Town,Address.Latitude,Address.Longitude,Types.Id,Types.Name,Media.TypeId,Media.Data,Currency.Symbol
      &api-key=xYfyViCWX3ghasznzOK3jWwFhLtDRrUN`;
    } else {
      axiosQuery = `https://api-beta.estateapps.co.uk/v2/property/residential/letting/${data.Id}?
    expand=MainPhoto,Address,Types,Media,Currency&fields=Id,TransactionTypeId,Bedrooms,Bathrooms,Description,Price,Address.Street,Address.Town,Address.Latitude,Address.Longitude,Types.Id,Types.Name,Media.TypeId,Media.Data,Currency.Symbol
      &api-key=xYfyViCWX3ghasznzOK3jWwFhLtDRrUN`;
    }

    axios
      .get(axiosQuery)
      .then((res) => {
        console.log(res.data.data);
        setPropertyData(res.data.data);
      })
      .catch(function (error) {
        console.log("Show error notification!");
      });
  };

  return (
    <Card
      sx={{ maxWidth: 345, margin: 2 }}
      onClick={() => showPropertyDetails()}
    >
      <CardActionArea>
        {data.FileUrl.MainPhoto === "" ? (
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
            image={data.FileUrl.MainPhoto + data.MainPhoto.Name}
            alt="image from database"
          />
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.Bedrooms && data.Bedrooms > 0 ? data.Bedrooms + " bed " : ""}
            {data.Types[0].Id !== 0 ? data.Types[0].Name : ""}{" "}
            {typeSearch === "sales" ? "for sale" : "to rent"} in{" "}
            {data.Address.Street && data.Address.Street !== ""
              ? data.Address.Street + ","
              : ""}
            {data.Address.Town && data.Address.Town !== ""
              ? data.Address.Town
              : ""}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <span style={{ padding: "10px" }}>
              <BedIcon /> {data.Bathrooms}
            </span>
            <span>
              <BathtubIcon /> {data.Bedrooms}
            </span>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {convertToPlain(data.Description)}
          </Typography>
          <br />
          <div style={{ backgroundColor: "#00308f", color: "white" }}>
            <Typography variant="h6">${data.Price}</Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
