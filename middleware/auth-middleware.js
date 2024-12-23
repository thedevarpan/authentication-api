const authMiddleware = (req, res, next) => {
    const header = req.header['authorization'];
    console.log(header);
    
    next();
};

module.exports = authMiddleware;
