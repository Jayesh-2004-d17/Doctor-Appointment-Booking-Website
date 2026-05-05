/*import jwt from 'jsonwebtoken'

// admin authentication middleware
const authAdmin = async(req, res, next) => {
    try {
        const {atoken} = req.headers
        if(!atoken){
            return res.json({success: false, message: 'Not Authorised Login Again'})
        }

        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET)

        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({success: false, message: 'Not Authorised Login Again'})
        }

        next()


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export default authAdmin
*/
/*
import jwt from "jsonwebtoken";

const authAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized, Login Again",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // optional check
    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.json({
        success: false,
        message: "Invalid Token",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authAdmin;
*/
import jwt from "jsonwebtoken";

const authAdmin = (req, res, next) => {
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

        req.adminId = decoded.id;

        next();

    } catch (error) {
        return res.json({
            success: false,
            message: "Token Expired, Login Again"
        });
    }
};

export default authAdmin;