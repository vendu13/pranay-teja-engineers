import jwt from 'jsonwebtoken';
import config from '../config.js';
import MessageModel from "../models/Message.js";
import toAPIArray from "../utils/toAPIArray.js";


export const login = async (req, res) => {
    try {
        const isValidUser = req.body.name === config.NAME && req.body.password === config.PASSWORD;

        if (!isValidUser) {
            return res.status(400).json({
                message: 'Wrong login or password',
            });
        }

        const token = jwt.sign(
            {
                name: config.NAME,
                password: config.PASSWORD,
            },
            config.JWT,
            {
                expiresIn: '2h',
            },
        );

        res.json({
            user: {
              name: config.NAME,
            },
            token,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Cannot login',
        });
    }
    return false;
};

export const getMe = async (req, res) => {
    try {
        const isValidUser = req.name === config.NAME && req.password === config.PASSWORD;

        if (!isValidUser) {
            return res.status(400).json({
                message: 'Wrong login or password',
            });
        }

        res.json({
            user: {
              name: config.NAME,
            },
            status: 'OK',
        });
    } catch (err) {
        return res.status(403).json({
            message: 'No access',
        });
    }
    return false;
};

export const contactUs = async (req, res) => {
    try {
        const doc = new MessageModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            message: req.body.message,
        });

        await doc.save();

        res.json({
            status: 'OK'
        });
    } catch (err) {
        return res.status(403).json({
            message: 'No access',
        });
    }
    return false;
};


export const sendMessages = async (req, res) => {
    try {
        const messagesData = await MessageModel.find();
        const messages = toAPIArray(messagesData);

        res.json({
            status: 'OK',
            messages
        });
    } catch (err) {
        return res.status(403).json({
            message: 'No access',
        });
    }
    return false;
};