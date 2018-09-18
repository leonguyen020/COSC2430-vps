import axios from "axios";
import { GET_PROJECTS } from "./types";
import { PROJECT_SERVER } from "./../components/utils/misc";

export function getProjects() {
  const request = axios
    .get(`${PROJECT_SERVER}/get-projects`)
    .then(response => response.data);
  return {
    type: GET_PROJECTS,
    payload: request,
  };
}
