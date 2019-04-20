const jwt = require('jsonwebtoken');

module.exports = (ctx) => {
    const Authorization = ctx.event.headers.Authorization;
    if (!Authorization) {
        throw new Error('Not authorized');
    }
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, 'secretKey1324');
    return userId;
}