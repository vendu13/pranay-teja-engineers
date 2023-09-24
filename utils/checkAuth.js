import jwt from 'jsonwebtoken';
import config from '../config.js';

const loadAuthorizeUser = async (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    if (token) {
        try {
            const { name, password } = jwt.verify(token, config.JWT);
            if (!name || name !== config.NAME || !password || password !== config.PASSWORD) throw new Error('No such user');
            req.name = name;
            req.password = password;
            next();
        } catch (err) {
            return res.status(403).json({
                message: 'No access',
            });
        }
    } else {
        return res.status(403).json({
            message: 'No access',
        });
    }
    return false;
};

export default loadAuthorizeUser;
