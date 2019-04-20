const jwt = require('jsonwebtoken');

module.exports = (ctx) => {
    const Authorization = ctx.event.headers.Authorization;
    if (!Authorization) {
        throw new Error('Not authorized');
    }
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, process.env.SECRET_KEY);
    return userId;
}