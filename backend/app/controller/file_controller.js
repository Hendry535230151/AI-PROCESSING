const fileService = require('../services/file_service');

const fileController = {
    getFiles: async (req, res) => {
        try {
            const files = await fileService.getFiles();
            res.status(200).json(files);
        } catch (err) {
            res.status(err.statusCode || 500).json({ error: err.message });
        }
    },

    getFileById: async (req, res) => {
        try {
            const { id } = req.params;
            const file = await fileService.getFileById(id);
            res.status(200).json(file);
        } catch (err) {
            res.status(err.statusCode || 500).json({ error: err.message });
        }
    },

    getFileByDirectory: async (req, res) => {
        try {
            const { directory_id } = req.params;
            const files = await fileService.getFileByDirectory(directory_id);
            res.status(200).json(files);
        } catch (err) {
            res.status(err.statusCode || 500).json({ error: err.message });
        }
    },

    createFile: async (req, res) => {
        try {
            const { owner_id, directory_id, filename, file } = req.body;
            if (!file) {
                return res.status(400).json({ error: "File field is required" });
            }
            await fileService.createFile(owner_id, directory_id, filename, file);
            res.status(201).json({ message: 'Success to create file'});
        } catch (err) {
            res.status(err.statusCode || 500).json({ error: err.message });
        }
    },

    renameFile: async (req, res) => {
        try {
            const { id } = req.params;
            const { newName } = req.body;
            await fileService.renameFile(id, newName);
            res.status(200).json({ message: 'Success to rename file' });
        } catch (err) {
            res.status(err.statusCode || 500).json({ error: err.message });
        }
    },

    changeFileToOtherDirectory: async (req, res) => {
        try {
            const { id } = req.params;
            const { directory_id } = req.body;
            await fileService.changeFileToOtherDirectory(directory_id, id);
            res.status(200).json({ message: 'Success to change file directory' });
        } catch (err) {
            res.status(err.statusCode || 500).json({ error: err.message });
        }
    },

    deleteFile: async (req, res) => {
        try {
            const { id } = req.params;
            await fileService.deleteFile(id);
            res.status(200).json({ message: 'Success to delete file' });
        } catch (err) {
            res.status(err.statusCode || 500).json({ error: err.message });
        }
    },
};

module.exports = fileController;
