require('dotenv').config();

module.exports = {
    app:{
        port: process.env.PORT || 3000,
    },
    jwt:{
        secret: process.env.JWT_SECRET || 'demo_secret_change_me',
    }
}
