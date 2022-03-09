require('dotenv').config();
const initiateExpress = require('./App/api/express-init');
const path = require('path');
const fs = require('fs');

const initServer = async () => {
    try {
        const filesDir = path.join(path.dirname(require.main.filename), "uploads");
        if (!fs.existsSync(filesDir)){
            fs.mkdirSync(filesDir);
        }
        initiateExpress();
      } catch (error) {
        console.error('Unable to initiate multer server:', error);
    }
};

initServer();