require("dotenv").config();
module.exports = {
  schemaFile: process.env.VITE_API_URL + "/v3/api-docs",
  apiFile: "./src/lib/api/apiSlice.ts",
  apiImport: "apiSlice",
  outputFile: "./src/lib/api/api.generated.ts",
  hooks: true,
};
