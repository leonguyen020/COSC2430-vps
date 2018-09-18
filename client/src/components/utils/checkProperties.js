export default function checkProperties(obj) {
  for (var key in obj) {
    if (obj[key] === "") return false;
  }
  return true;
}
