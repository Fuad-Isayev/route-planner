import APIClient from "../client";

export const routesAPI = {
  calculate: ({ coordinates, options }) => {
    return APIClient.post(`/directions/driving-hgv`, {
      coordinates,
      options,
    });
  },
};
