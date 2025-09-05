import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API generated with swagger-jsdoc",
    },
    servers: [
      {
        url: "/api/v1",
        description: "API v1",
      },
    ],
  },
  apis: [path.resolve(__dirname, "../controllers/*.ts")],
};

export const swaggerSpec = swaggerJSDoc(options);
