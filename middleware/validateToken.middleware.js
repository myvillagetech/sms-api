const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    if (
        req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
        try {
            const decodedUser = await jwt.verify(
                req.headers.authorization.split(" ")[1],
                process.env.API_SECRET
            );
            req.user = decodedUser;
            next();
        } catch (error) {
            res.status(401).send({ status: "Failed", message: "UnAuthorized - Invalid token" });
        }
    } else {
        res.status(401).send({ status: "Failed", message: "UnAuthorized - Token Not found" });
    }
};
module.exports = verifyToken;
