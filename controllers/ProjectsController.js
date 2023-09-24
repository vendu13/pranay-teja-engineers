import config from "../config.js";
import fs from "fs";
import Jimp from "jimp";
import ProjectModel from '../models/Project.js'
import toAPIArray from '../utils/toAPIArray.js';

export const setGallery = async (req, res) => {
    try {
        for (const el of req.files) {
            const index = req.files.indexOf(el);
            await Jimp.read(el.path)
                .then((image) =>
                    image.write(`${config.imageFolder}/${req.body.projectName}/gallery/${index}.jpeg`))
                .catch((error) => {
                    console.error(error);
                });
            fs.unlinkSync(el.path);
        }
        res.json({
            status: 'OK',
        });
    } catch (err) {
        return res.status(403).json({
            message: 'No access',
        });
    }
    return false;
};

export const setMain = async (req, res) => {
    try {
        await Jimp.read(req.file.path)
            .then((image) =>
                image.write(`${config.imageFolder}/${req.body.title}/main/0.jpeg`))
            .catch((error) => {
                console.error(error);
            });
        fs.unlinkSync(req.file.path);

        const doc = new ProjectModel({
            title: req.body.title,
            desc: req.body.desc,
            location: req.body.location,
            category: req.body.type,
            images: {
                gallery: Number(req.body.gallery),
            }
        });

        await doc.save();

        const projectsData = await ProjectModel.find();
        const projects = toAPIArray(projectsData);

        res.json({
            status: 'OK',
            projects
        });
    } catch (err) {
        return res.status(403).json({
            message: 'No access',
        });
    }
    return false;
};


export const deleteProject = async (req, res) => {
    try {
        await ProjectModel.deleteOne({
            _id: req.body.id,
        });

        fs.rmSync(`${config.imageFolder}/${req.body.title}`, { recursive: true, force: true });

        const projectsData = await ProjectModel.find();
        const projects = toAPIArray(projectsData);

        res.json({
            status: 'OK',
            projects
        });
    } catch (err) {
        return res.status(403).json({
            message: 'No access',
        });
    }
    return false;
};


export const sendProjects = async (req, res) => {
    try {
        const projectsData = await ProjectModel.find();
        const projects = toAPIArray(projectsData);

        res.json({
            status: 'OK',
            projects
        });
    } catch (err) {
        return res.status(403).json({
            message: 'No access',
        });
    }
    return false;
};