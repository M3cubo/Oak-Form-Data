# Oak-Form-Data
This repository is intended to solve the encoding/parsing of the FormData in Oak Deno.

The issue was described in https://github.com/oakserver/oak/issues/400

To check how FormData works fine in Deno, use `deno run ./DenoServer.js` and open localhost:8000 in the browser. It will show the response parsed as FormData correctly.

Instead, `deno run ./OakServer.js` sends the FormData, but for some reason web browser can't parse it as FormData. Firefox logs the error: `TypeError: Could not parse content as FormData` and in Chrome says: `TypeError: Invalid MIME type`.

In any case, `curl -X POST http://localhost:8000/formData` will retrieve the FormData using `./DenoServer`, and also `./OakServer.js`.
