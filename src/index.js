// Export middleware.
module.exports = (auth) => {
    return async (ctx, next) => {
        await auth.check((req, res, err) => {
            if (err) {
                throw err;
            } else {
                next();
            }
        })(ctx.req, ctx.res);
    };
}