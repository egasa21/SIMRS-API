import User from "../models/User.js";
import jwt from "jsonwebtoken";

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT, {
        expiresIn: maxAge
    });
}

export const register = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.create({ username, email, password });
        // const token = createToken(user._id);

        res.status(200).json('User register successfully')
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
    // const { email, password } = req.body;

    try {
        const user = await User.login(req.body.email, req.body.password);
        const token = createToken(user._id);
        const { password, isAdmin, ...otherDetals } = user._doc;

        res.cookie('access_token', token, { httpOnly: true }).status(200).json({ detail: { ...otherDetals }, isAdmin });
    } catch (error) {
        next(error)
    }
}