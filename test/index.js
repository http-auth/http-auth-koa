"use strict";

// Expect module.
import {expect} from 'chai'

// Request module.
import request from 'request'

// Koa.
import Koa from 'koa'

// Source.
import auth from 'http-auth'
import koaAuth from '../src/index'

// Express.
describe('koa', function () {
    let server = undefined;

    before(function () {
        // Configure authentication.
        const basic = auth.basic({
            realm: "Private Area."
        }, function (username, password, done) {
            if (username === 'gevorg') {
                done(new Error("Error comes here"));
            } else if (username === "mia" && password === "supergirl") {
                done(true);
            } else if (username === "ColonUser" && password === "apasswordwith:acolon") {
                done(true);
            } else {
                done(false);
            }
        });


        // Koa setup.
        const app = new Koa();

        // Setup auth.
        app.use(koaAuth(basic));

        // Setup basic handler.
        app.use(async ctx => {
            ctx.body = `Welcome to private area - ${ctx.request.user}!`;
        });

        // Start server.
        server = app.listen(1337);
    });

    after(function () {
        server.close();
    });

    it('error', function () {
        let callback = function (error, response, body) {
            expect(body).to.equal("Error comes here");
        };

        // Test request.
        request.get('http://127.0.0.1:1337', callback).auth('gevorg', 'gpass');
    });

    it('success', function () {
        let callback = function (error, response, body) {
            expect(body).to.equal("Welcome to private area - mia!");
        };

        // Test request.
        request.get('http://127.0.0.1:1337', callback).auth('mia', 'supergirl');
    });

    it('wrong password', function () {
        let callback = function (error, response, body) {
            expect(body).to.equal("401 Unauthorized");
        };

        // Test request.
        request.get('http://127.0.0.1:1337', callback).auth('mia', 'cute');
    });

    it('wrong user', function () {
        let callback = function (error, response, body) {
            expect(body).to.equal("401 Unauthorized");
        };

        // Test request.
        request.get('http://127.0.0.1:1337', callback).auth('Tina', 'supergirl');
    });

    it('password with colon', function () {
        let callback = function (error, response, body) {
            expect(body).to.equal("Welcome to private area - ColonUser!");
        };

        // Test request.
        request.get('http://127.0.0.1:1337', callback).auth('ColonUser', 'apasswordwith:acolon');
    });
});