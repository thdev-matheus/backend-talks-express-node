import app from "./app";
import AppDataSource from "./data-source";
import "dotenv/config";

const init = async () => {
  const PORT = process.env.PORT || 3000;

  await AppDataSource.initialize()
    .then(() => {
      console.log(`Data source initialized on port 5432`);
    })
    .catch((err: any) => {
      console.log("Error during Data Source initialization", err);
    });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`);
  });
};

init();
