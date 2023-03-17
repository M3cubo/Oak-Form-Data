import { Application, send, Router } from "https://deno.land/x/oak@v12.1.0/mod.ts";
// import FormData from "npm:form-data"; // ???

const Main = async () => {

const myRouter = new Router();

const app = new Application();
app.use(myRouter.routes());
app.use(myRouter.allowedMethods());

app.addEventListener('error', (event) => {
  console.log("🚨 " + event.error);
});

myRouter.get('/', async (ctx) => {

  ctx.response.body = new TextEncoder().encode(`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <title>Test</title>
    </head>
    <body>
    <h1>🐿️ Oak: Receive FormData</h1>
    <script>
    let formData = new FormData();  
    fetch('http://localhost:8000/formData', { 
        method: 'POST',
        body: formData,
    })
    .then(fetch => fetch.formData())
    .then(res => { 
        console.log("RESPONSE FORM DATA", res); 
        alert("✅ FormData Response on Dev Tools"); 
    })
    </script>
    </body>
  </html>
  `);

});

myRouter.post('/formdata', async (ctx) => {

  const data = new FormData();
  data.append("string", "Hi");
  data.append("blob", new Blob(['<b>Bye</b>'], { type: "text/xml" }));
  
  console.log(data);
  ctx.response.body = data;

});

await app.listen({ port: 8000 });
console.log(`======================`);
console.log(`http://localhost:8000/`);
console.log(`======================`);

}

Main();
