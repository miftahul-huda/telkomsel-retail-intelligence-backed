const { Model, DataTypes } = require('sequelize');
const CountryAndCityModel = require('./countryandcitymodel');

class UserModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            password: DataTypes.STRING,
            firstname: DataTypes.STRING,
            lastname: DataTypes.STRING,
            gender: DataTypes.STRING,
            photourl: DataTypes.STRING,
            cityId:  DataTypes.INTEGER,
            email: DataTypes.STRING
        }, 
        { sequelize, modelName: 'user', tableName: 'user', force: force });
    }
}

module.exports = UserModel;