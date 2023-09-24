import config from '../config.js';
import fs from "fs";

export const checkPath = async (req, res, next) => {
    try {
        if (!fs.existsSync(`${config.imageFolder}`)) {
            fs.mkdirSync(`${config.imageFolder}`);
        }
        if (!fs.existsSync(`${config.imageFolder}/${req.body.projectName}`)) {
            fs.mkdirSync(`${config.imageFolder}/${req.body.projectName}`);
        }
        next();
    } catch (err) {
        return res.status(403).json({
            message: 'No access',
        });
    }
    return false;
};

export const checkPathMain = async (req, res, next) => {
    try {
        if (!fs.existsSync(`${config.imageFolder}`)) {
            fs.mkdirSync(`${config.imageFolder}`);
        }
        if (!fs.existsSync(`${config.imageFolder}/${req.body.title}`)) {
            fs.mkdirSync(`${config.imageFolder}/${req.body.title}`);
        }
        next();
    } catch (err) {
        return res.status(403).json({
            message: 'No access',
        });
    }
    return false;
};
