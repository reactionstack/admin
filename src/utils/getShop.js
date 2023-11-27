import { matchPath } from "react-router";

/**
 * @method getShopId
 * @summary 根据url获取shopId
 * @returns {string} shopId - shop id
 */
export function getShopId() {
  const route = matchPath(location.pathname, {
    path: "/:shopId/",
    exact: false
  });

  if (!route) {
    return "";
  }

  const { shopId } = route.params;

  if (shopId === "new-shop") {
    return "";
  }

  return shopId;
}
