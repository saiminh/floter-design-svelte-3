import { l as loading } from "../../chunks/stores2.js";
loading.set(true);
const load = async ({ url }) => {
  const { pathname } = url;
  loading.set(false);
  return {
    pathname
  };
};
export {
  load
};
