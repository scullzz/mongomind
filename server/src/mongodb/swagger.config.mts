import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MongoMind",
      version: "1.0.0",
    },
  },
  apis: ["./src/mongodb/controller/*.mts"],
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
