import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.json({
                success: false,
                message: "Not Authorized, Login Again"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.id;

        next();

    } catch (error) {
        return res.json({
            success: false,
            message: "Token Expired, Login Again"
        });
    }
};

export default authUser;