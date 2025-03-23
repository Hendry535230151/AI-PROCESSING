const fileModel = require('../models/file_model');
const CustomError = require('../utils/CustomError');

const getFiles = async () => {
    try {
        const files = await fileModel.getFiles();
        if (!files) {
            throw new CustomError('Files not found', 404);
        }
        return files;
    }
    catch (err) {
        throw new CustomError(err.message, 500);
    }
};

const getFileById = async (id) => {
    try {
        if (!id) {
            throw new CustomError('File id is required', 400)
        }
        
        const file = await fileModel.getFileById(id);
        if (!file) {
            throw new CustomError(`File with id: ${id}, not found`, 404);
        }
        return file;
    }
    catch (err) {
        throw new CustomError(err.message, 500);
    }
}

const getFileByDirectory = async (directory_id) => {
    try {
        if (!directory_id) {
            throw new CustomError('Directory id is required', 400)
        }

        const file = await fileModel.getFileByDirectory(directory_id);
        if (!file) {
            throw new CustomError(`File with directory id: ${directory_id}, not found`, 404);
        }
        return file;
    }
    catch (err) {
        throw new CustomError(err.message, 500);
    }
};

const createFile = async (owner_id, directory_id, filename, file) => {
    try {
        const errors = [];
        if (!owner_id) {
            errors.push('Owner id is required');
        }
        if (!directory_id) {
            errors.push('Directory id is required');
        }
        if (!filename) {
            errors.push('Filename is required');
        }
        if (!file) {
            errors.push('File is required');
        }
        if (errors.length > 0) {
            throw new CustomError(errors, 400);
        }

        const createFile = await fileModel.createFile(owner_id, directory_id, filename, file);
        if (!createFile) {
            throw new CustomError('Failed to upload file', 500);
        }
        return createFile;
    }
    catch (err) {
        throw new CustomError(err.message, 500);
    }
};

const renameFile = async (id, newName) => {
    try {
        const errors = [];
        if (!id) {
            errors.push('File id is required');
        }
        if (!newName) {
            errors.push('New filename is required');
        }
        if (errors.length > 0) {
            throw new CustomError(errors, 400);
        }

        const searchFile = await fileModel.getFileById(id);
        if (!searchFile) {
            throw new CustomError(`File with id: ${id}, not found`, 404);
        }

        const file = await fileModel.renameFile(id, newName);
        if (!file) {
            throw new CustomError(`Failed to rename file with file id: ${id}`, 50);
        }
        return file;
    }
    catch (err) {
        throw new CustomError(err.message, 500);
    }
};

const changeFileToOtherDirectory = async (directory_id, id)  => {
    try {
        const errors = [];
        if (!directory_id) {
            errors.push('Directory id is required');
        }
        if (!id) {
            errors.push('File id is required');
        }
        if (errors.length > 0) {
            throw new CustomError(errors, 400);
        }

        const file = await fileModel.changeFileToOTherDirectory(directory_id, id);
        if (!file) {
            throw new CustomError(`Failed to change direcotry with file id: ${id} `, 500);
        }
        return file;
    }
    catch (err) {
        throw new CustomError(err.message, 500);
    }
};

const deleteFile = async (id) => {
    try {
        if (!id) {
            throw new CustomError('File id is required', 400);
        }

        const searchFile = await fileModel.getFileById(id);
        if (!searchFile) {
            throw new CustomError(`File with id: ${id}, not found`, 404);
        }

        const file = await fileModel.deleteFile(id);
        if (!file) {
            throw new CustomError('Failed to delete file')
        }
    } 
    catch (err) {
        throw new CustomError(err.message, 500);
    }
};

module.exports = {
    getFiles,
    getFileById,
    getFileByDirectory,
    createFile,
    renameFile,
    changeFileToOtherDirectory,
    deleteFile,
};