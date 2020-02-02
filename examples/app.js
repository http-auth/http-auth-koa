// Authentication module.
const auth =  require('http-auth');
const koaAuth = require('../src/index');

const basic = auth.basic({
    realm: "Simon Area.",
    file: __dirname + "/../data/users.htpasswd"
});

// Koa setup.
const Koa = require('koa');
const app = new Koa();

// Setup basic handler.
app.use(async (ctx, next) => {
    await next();
    ctx.body = `Welcome to koa ${ctx.req.user}!`;
});

// Setup auth.
app.use(koaAuth(basic));

// Start server.
app.listen(1337, function () {
    // Log URL.
    console.log("Server running at http://127.0.0.1:1337/");
});