// Export middleware.
module.exports = (auth) => {
    return async (ctx, next) => {
        await auth.check(ctx.req, ctx.res, (req, res, err) => {
            if (err) {
                throw err;
            } else {
                next();
            }
        });
    };
}