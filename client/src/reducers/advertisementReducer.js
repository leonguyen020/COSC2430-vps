import {
  GET_ADVERTISEMENTS,
  GET_ADVERTISEMENTS_BY_POST_DATE,
  GET_ADVERTISEMENTS_TO_PROPERTIES,
  GET_ADVERTISEMENT_BY_ID,
  CLEAR_GET_ADVERTISEMENT_BY_ID,
  GET_AREAS,
  GET_DIRECTIONS,
} from "./../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case GET_ADVERTISEMENTS: {
      return { ...state, advertisements: action.payload };
    }
    case GET_ADVERTISEMENTS_BY_POST_DATE: {
      return { ...state, byPostDate: action.payload };
    }
    case GET_ADVERTISEMENTS_TO_PROPERTIES: {
      return {
        ...state,
        toProperties: action.payload.advertisements,
        toPropertiesSize: action.payload.size,
      };
    }
    case GET_ADVERTISEMENT_BY_ID: {
      return { ...state, advertisementDetail: action.payload };
    }
    case CLEAR_GET_ADVERTISEMENT_BY_ID: {
      return { ...state, advertisementDetail: action.payload };
    }
    case GET_AREAS: {
      return { ...state, areas: action.payload };
    }
    case GET_DIRECTIONS: {
      return { ...state, directions: action.payload };
    }
    default:
      return state;
  }
}
