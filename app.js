const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const signRouter = require("./routes/signRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const userRouter = require("./routes/userRoutes");
const feedbackRouter = require("./routes/feedbackRoutes");
const adminRouter = require("./routes/adminRoutes");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "sign-languages api documentation",
      version: "1.0.0",
      description: "API documentation for sign language translator app",
      contact: {
        name: "Abel Kinfu",
      },
    },
    servers: [
      {
        url: "https://sign-languages-api-1.onrender.com",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/signs", signRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/feedback", feedbackRouter);
app.use("/api/v1/admin", adminRouter);

module.exports = app;
