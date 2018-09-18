import axios from "axios";
import {
  GET_ADVERTISEMENTS,
  GET_ADVERTISEMENTS_BY_POST_DATE,
  GET_ADVERTISEMENTS_TO_PROPERTIES,
  GET_ADVERTISEMENT_BY_ID,
  CLEAR_GET_ADVERTISEMENT_BY_ID,
  GET_AREAS,
  GET_DIRECTIONS,
} from "./types";

import { ADVERTISEMENT_SERVER } from "./../components/utils/misc";

////////////////////////////////
/////////  ADVERTISEMENTS
////////////////////////////////

export function getAdvertisements() {
  const request = axios
    .get(`${ADVERTISEMENT_SERVER}/get-advertisements`)
    .then(response => response.data);

  return {
    type: GET_ADVERTISEMENTS,
    payload: request,
  };
}

// get and sort ads by post date
export function getAdvertisementsByPostDate() {
  // ?sortBy=postDate&order=desc&limit=4
  const request = axios
    .get(
      `${ADVERTISEMENT_SERVER}/get-sort-advertisements?sortBy=postDate&order=desc&limit=4`,
    )
    .then(response => response.data);

  return {
    type: GET_ADVERTISEMENTS_BY_POST_DATE,
    payload: request,
  };
}

// get ads to displaying page
export function getAdvertisementsToProperties(
  skip,
  limit,
  filters = [],
  previousState = [],
) {
  const data = {
    limit,
    skip,
    filters,
  };
  // console.log("*************",data.filters)
  const request = axios
    .post(`${ADVERTISEMENT_SERVER}/properties`, data)
    .then(response => {
      let newState = [...previousState, ...response.data.advertisements];

      return {
        size: response.data.size,
        advertisements: newState,
      };
    });

  return {
    type: GET_ADVERTISEMENTS_TO_PROPERTIES,
    payload: request,
  };
}

// get ad by id
export function getAdvertisementById(id) {
  const request = axios
    .get(`${ADVERTISEMENT_SERVER}/get-ad-by-id?id=${id}&type=single`)
    .then(response => {
      return response.data[0];
    });

  return {
    type: GET_ADVERTISEMENT_BY_ID,
    payload: request,
  };
}

// clear get ad by id
export function clearGetAdvertisementById() {
  return {
    type: CLEAR_GET_ADVERTISEMENT_BY_ID,
    payload: "",
  };
}

////////////////////////////////
/////////  AREA
////////////////////////////////

export function getAreas() {
  const request = axios
    .get(`${ADVERTISEMENT_SERVER}/areas/get-areas`)
    .then(response => response.data);
  return {
    type: GET_AREAS,
    payload: request,
  };
}

////////////////////////////////
/////////  DIRECTION
////////////////////////////////

export function getDirections() {
  const request = axios
    .get(`${ADVERTISEMENT_SERVER}/directions/get-directions`)
    .then(response => response.data);
  return {
    type: GET_DIRECTIONS,
    payload: request,
  };
}
