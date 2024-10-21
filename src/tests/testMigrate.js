require('../models')

const sequelize = require('../utils/connection');


const testMigrate = async () => {
    try {
        await sequelize.sync({force: true});
        console.log("Database has been reset succesfuly 🧐👀😎");
        
    } catch (error) {
        console.log(error)
    }
}

testMigrate();
