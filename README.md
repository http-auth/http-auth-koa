# http-auth-koa
[Koa framework](http://koajs.com/) integration with [http-auth](https://github.com/gevorg/http-auth) module.

[![build](https://github.com/http-auth/http-auth-koa/workflows/build/badge.svg)](https://github.com/http-auth/http-auth-koa/actions/workflows/build.yml)

## Installation

Via git (or downloaded tarball):

```bash
$ git clone git://github.com/http-auth/http-auth-koa.git
```
Via [npm](http://npmjs.org/):

```bash
$ npm install http-auth-koa
```    

## Usage
```javascript
// Authentication module.
const auth = require("http-auth");
const koaAuth = require("http-auth-koa");

const basic = auth.basic({
  realm: "Simon Area.",
  file: __dirname + "/../data/users.htpasswd"
});

// Koa setup.
const Koa = require("koa");
const app = new Koa();

// Setup basic handler.
app.use(async (ctx, next) => {
  await next();
  ctx.body = `Welcome to koa ${ctx.req.user}!`;
});

// Setup auth.
app.use(koaAuth(basic));

// Start server.
app.listen(1337, function() {
  // Log URL.
  console.log("Server running at http://127.0.0.1:1337/");
});
```


## Running tests

It uses [mocha](https://mochajs.org/), so just run following command in package directory:

```bash
$ npm test
```

## License

The MIT License (MIT)