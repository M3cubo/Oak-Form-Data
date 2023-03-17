# Oak-Form-Data
This repository is intended to solve the encoding/parsing of the FormData in Oak Deno.

Run `deno run ./DenoServer.js` and it will show a correct parsing of FormData in every browser.

Instead, `deno run ./OakServer.js` would send the FormData, but it is not correctly parsed for web browsers. 

If you use `curl -X POST http://localhost:8000/formData` it will retrieve the FormData using the ./DenoServer, and also the ./OakServer.js.