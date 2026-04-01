require('dotenv').config();

module.exports = {
  schemaFile: process.env.VITE_API_URL + '/v3/api-docs', // your OpenAPI JSON
  apiFile: './src/lib/api/apiSlice.ts',                    // the slice file
  apiImport: 'apiSlice',                                  // variable name
  outputFile: './src/lib/api/api.generated.ts',           // generated hooks
  hooks: true,                                            // generate hooks
  mutationHooks: true,                                    // generate mutation hooks
  queryHooks: true,                                       // generate query hooks
  lazyQueries: true,                                      // generate lazy hooks
};