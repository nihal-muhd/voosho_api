import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).send({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).send({ message: 'Invalid token' });
    }
};

// Authorization middleware to check if the user can access the requested profile
export const authorizeViewProfile = async (req, res, next) => {
    try {
        const requestedUserId = req.params.id;
        const requestedUser = await UserModel.findById(requestedUserId);

        if (!requestedUser) {
            return res.status(404).send({ message: 'User not found' });
        }

        if (requestedUser.private) {
            if (req.user.role !== 'admin') {
                return res.status(403).send({ message: 'No access' });
            }
        }

        req.profile = requestedUser;
        next();
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' });
    }
};