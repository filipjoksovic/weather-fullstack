import { LocationDetailsResponse } from './api/response/location-details.response';

export type LocationDetails = {
  latitude: number;
  longitude: number;
  category: string;
  type: string;
  name: string;
  displayName: string;
  address: {
    amenity: string;
    houseNumber: string;
    road: string;
    quarter: string;
    suburb: string;
    city: string;
    postcode: number;
    country: string;
    countryCode: string;
  };
  boundingBox: string[];
};

export const locationDetailsResponseToLocationDetails = (
  response: LocationDetailsResponse
): LocationDetails => {
  return {
    latitude: response.lat,
    longitude: response.lon,
    category: response.category,
    type: response.type,
    name: response.name,
    displayName: response.display_name,
    address: {
      amenity: response.address.amenity,
      houseNumber: response.address.house_number,
      road: response.address.road,
      quarter: response.address.quarter,
      suburb: response.address.suburb,
      city: response.address.city,
      postcode: response.address.postcode,
      country: response.address.country,
      countryCode: response.address.country_code,
    },
    boundingBox: response.boundingbox,
  };
};
