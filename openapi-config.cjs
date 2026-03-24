module.exports = {
  schemaFile: "http://localhost:3005/v3/api-docs",
  apiFile: "./src/lib/api/apiSlice.ts",
  apiImport: "apiSlice",
  outputFile: "./src/lib/api/api.generated.ts",
  hooks: true,
};
