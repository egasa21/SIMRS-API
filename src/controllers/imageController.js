import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import path from 'path'

export const getImage = (req, res, next) => {
  try {
    const { imageName } = req.params;
    const imagePath = fileURLToPath(import.meta.url);
    const directoryPath = dirname(imagePath);
    const filePath = path.join(directoryPath, '..', 'uploads', imageName);

    if (fs.existsSync(filePath)) {
      // If the image file exists, send it as a response
      res.sendFile(filePath);
    } else {
      // If the image file does not exist, return a 404 response
      res.status(404).json('Image not found');
    }
  } catch (error) {
    next(error);
    console.log(error);
  }
};
