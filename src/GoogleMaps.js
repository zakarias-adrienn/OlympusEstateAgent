import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => (
  <div
    style={{
      color: "white",
      background: "red",
      padding: "10px 10px",
      display: "inline-flex",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "100%",
      transform: "translate(-50%, -50%)",
    }}
  >
    {text}
  </div>
);

const GoogleMaps = ({ latitude, longitude }) => {
  return (
    <div style={{ height: "50vh", width: "100%" }}>
      <GoogleMapReact
        defaultCenter={{ lat: latitude, lng: longitude }}
        defaultZoom={16}
      >
        <AnyReactComponent lat={latitude} lng={longitude} text={""} />
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMaps;
