// Start listening on port 8080 of localhost.
const server = Deno.listen({ port: 9000 });
console.log(`HTTP webserver running.  Access it at:  http://localhost:9000/`);

// Connections to the server will be yielded up as an async iterable.
for await (const conn of server) {
  // In order to not be blocking, we need to handle each connection individually
  // without awaiting the function
  serveHttp(conn);
}

async function serveHttp(conn) {

  // This "upgrades" a network connection into an HTTP connection.
  const httpConn = Deno.serveHttp(conn);

  // Each request sent over the HTTP connection will be yielded as an async
  // iterator from the HTTP connection.
  for await (const requestEvent of httpConn) {
    
    let body = undefined;

    if (requestEvent.request.method === "GET" && requestEvent.request.url === "http://localhost:9000/") {
        body = new TextEncoder().encode(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <title>Test</title>
            </head>
            <body>
            <h1>🦕 Deno std: Receive FormData</h1>
            <script>
            let formData = new FormData();  
            fetch('http://localhost:9000/formData', { 
                method: 'POST',
                body: formData,
            })
            .then(fetch => fetch.formData())
            .then(res => { alert("OK"); console.log("RESPONSE FORM DATA", res); })
            </script>
            </body>
          </html>
        `);
    }
    else if (requestEvent.request.method === "POST" && requestEvent.request.url === "http://localhost:9000/formData") {
        
        console.log("/formData");

        const videoFile = await Deno.readFile(`${Deno.cwd()}/files/Film.mp4`);
        const blob = new Blob([videoFile], { type: "video/mp4" });

        const data = new FormData();
        data.append("string", "Hi");
        data.append("video", blob);
        data.append("blob", new Blob(['<b>Bye</b>'], { type: "text/xml" }));
        requestEvent.respondWith(new Response(data));
        return;
        
    }
    else {
        body = `Your user-agent is:\n\n${
            requestEvent.request.headers.get("user-agent") ?? "Unknown"
        }`;
    }
    
    // The requestEvent's `.respondWith()` method is how we send the response
    // back to the client.
    requestEvent.respondWith(
      new Response(body, {
        status: 200,
      }),
    );

  }
}
