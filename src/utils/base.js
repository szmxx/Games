export const filterRoutes = (routes) => {
  return routes.filter(route => {
    return route.name !== "Portal";
  })
}