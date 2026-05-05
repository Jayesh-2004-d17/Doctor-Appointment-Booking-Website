import jwt from "jsonwebtoken";

const authDoctor = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.json({
                success: false,
                message: "Not Authorized, Login Again"
            });
        }

        const dtoken = authHeader.split(" ")[1];

        const decoded = jwt.verify(dtoken, process.env.JWT_SECRET);

        req.userId = decoded.id; // store here

        next();

    } catch (error) {
        return res.json({
            success: false,
            message: "Token Expired, Login Again"
        });
    }
};

export default authDoctor;