import app from "./app";

const startServer = async () => {
  app.listen(5000, '0.0.0.0', () => {
    console.log(`Server is running at http://0.0.0.0:5000`);
  });
};

startServer();
