export type LocationDetailsResponse = {
  lat: number;
  lon: number;

  category: string;
  type: string;
  name: string;
  display_name: string;
  address: {
    amenity: string;
    house_number: string;
    road: string;
    quarter: string;
    suburb: string;
    city: string;
    postcode: number;
    country: string;
    country_code: string;
  };
  boundingbox: string[];
};
