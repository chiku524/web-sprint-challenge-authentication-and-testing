const jwt = require('jsonwebtoken');

function restrict() {

    return async (req, res, next) => {
        console.log(process.env.JWT_SECRET)
        
        try {
            const token = req.headers.authorization;

            jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
                if(error) {
                    return res.status(401).json('please sign in');
                }

                req.token = decoded;
                next();
            })
        } catch {
            next(error)
        }
    }
}

module.exports = {
    restrict
}