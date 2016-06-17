"use strict";

// Export middleware.
export default function (auth) {
    return async (ctx, next) => {
        await auth.check(ctx.req, ctx.res, (req, res, err) => {
            if (err) {
                next(err);
            } else {
                next();
            }
        });
    };
}