const Koa = require("koa");

// Source.
const auth = require("http-auth");
const koaAuth = require("../src/index");

// Request module.
const request = require("request");

// Expect module.
const expect = require("chai").expect;

// Express.
describe("koa", function() {
  let server = undefined;

  before(function() {
    // Configure authentication.
    const basic = auth.basic(
      {
        realm: "Private Area."
      },
      function(username, password, done) {
        if (username === "gevorg") {
          done(new Error("Error comes here"));
        } else if (username === "mia" && password === "supergirl") {
          done(true);
        } else if (
          username === "ColonUser" &&
          password === "apasswordwith:acolon"
        ) {
          done(true);
        } else {
          done(false);
        }
      }
    );

    // Koa setup.
    const app = new Koa();

    // Wait for error.
    app.use(async (ctx, next) => {
      try {
        await next();
      } catch (err) {
        ctx.body = err.message;
        ctx.status = 400;
      }
    });

    // Setup basic handler.
    app.use(async (ctx, next) => {
      await next();
      ctx.body = `Welcome to private area - ${ctx.req.user}!`;
    });

    // Setup auth.
    app.use(koaAuth(basic));

    // Start server.
    server = app.listen(1337);
  });

  after(function() {
    server.close();
  });

  it("error", function(done) {
    const callback = function(_error, _response, body) {
      expect(body).to.equal("Error comes here");
      done();
    };

    // Test request.
    request.get("http://127.0.0.1:1337", callback).auth("gevorg", "gpass");
  });

  it("success", function(done) {
    const callback = function(error, response, body) {
      expect(body).to.equal("Welcome to private area - mia!");
      done();
    };

    // Test request.
    request.get("http://127.0.0.1:1337", callback).auth("mia", "supergirl");
  });

  it("wrong password", function(done) {
    const callback = function(error, response, body) {
      expect(body).to.equal("401 Unauthorized");
      done();
    };

    // Test request.
    request.get("http://127.0.0.1:1337", callback).auth("mia", "cute");
  });

  it("wrong user", function(done) {
    const callback = function(error, response, body) {
      expect(body).to.equal("401 Unauthorized");
      done();
    };

    // Test request.
    request.get("http://127.0.0.1:1337", callback).auth("Tina", "supergirl");
  });

  it("password with colon", function(done) {
    const callback = function(error, response, body) {
      expect(body).to.equal("Welcome to private area - ColonUser!");
      done();
    };

    // Test request.
    request
      .get("http://127.0.0.1:1337", callback)
      .auth("ColonUser", "apasswordwith:acolon");
  });
});
