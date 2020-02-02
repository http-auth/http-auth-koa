# http-auth-koa
[Koa framework](http://koajs.com/) integration with [http-auth](https://github.com/http-auth/http-auth) module.

[![build](https://github.com/http-auth/http-auth-koa/workflows/build/badge.svg)](https://github.com/http-auth/http-auth-koa/actions?query=workflow%3Abuild)

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
const auth =  require('http-auth');
const koaAuth = require('http-auth-koa');

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
```


## Running tests

It uses [mocha](https://mochajs.org/), so just run following command in package directory:

```bash
$ npm test
```

## Issues

You can find list of issues using **[this link](http://github.com/http-auth/http-auth-koa/issues)**.

## Requirements

 - **[Node.js](http://nodejs.org)** - Event-driven I/O server-side JavaScript environment based on V8.
 - **[npm](http://npmjs.org)** - Package manager. Installs, publishes and manages node programs.

## License

The MIT License (MIT)

Copyright (c) Gevorg Harutyunyan

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
