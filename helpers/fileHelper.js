const fs = require("fs");
const path = require("path");

const deleteFile = (filePath) => {
  try {
    if (!filePath) return;

    const fullPath = path.resolve(filePath);

    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  } catch (error) {
    console.log("File delete error", error.message);
  }
};

module.exports = { deleteFile };
