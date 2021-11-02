import firebase from '../firebase';
import User from '../models/user';

export const checkAuth = async (req, res, next) => {
    try {
        const firebaseUser = await firebase.auth().verifyIdToken(req.headers.authtoken);
        req.user = firebaseUser;
        next();
    } catch (error) {
        res.status(401).json({
            error: "invalid or expired token"
        })
    }
}
export const adminCheck = async (req, res, next) => {
    const { email } = req.user;
    console.log(email);
    const adminUser = await User.findOne({ email }).exec();
    console.log('adminUser', adminUser)
    if (adminUser.role !== 'admin') {
        res.status(400).json({
            err: "Admin resource. Access Denined"
        })
    } else {
        next();
    }
}