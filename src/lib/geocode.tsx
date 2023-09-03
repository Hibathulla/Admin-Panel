import Geocode from "react-geocode";

Geocode.setLanguage("en");

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("in");

Geocode.setLocationType("ROOFTOP");

// Get latitude & longitude from address.
export const getGeocodeAddress = (address: string) => {
  let loc: string = "";
  let err: string = "";
  Geocode.fromAddress(address).then(
    (response) => {
      const { lat, lng } = response.results[0].geometry.location;
      console.log(lat, lng);
      loc = lat;
    },
    (error) => {
      err = error;
      //   console.error(error);
    }
  );
  return { loc, err };
};
