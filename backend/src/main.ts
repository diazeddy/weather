import app from "./app";

const startServer = async () => {
  app.listen(5000, "127.0.0.1", () => {
    console.log("Server is running at http://127.0.0.1:5000.");
  });
};

startServer();
