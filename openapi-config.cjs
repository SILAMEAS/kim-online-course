module.exports = {
  schemaFile: "http://localhost:3005/v3/api-docs",
  apiFile: "./src/lib/api/generateApiSlice.ts",
  apiImport: "baseApi",
  outputFile: "./src/lib/api/api.generated.ts",
  hooks: true,
};
