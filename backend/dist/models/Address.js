"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
const User_1 = __importDefault(require("./User"));
class Address extends sequelize_1.Model {
}
Address.init({
    street: {
        type: sequelize_1.DataTypes.STRING,
    },
    district: {
        type: sequelize_1.DataTypes.STRING,
    },
    city: {
        type: sequelize_1.DataTypes.STRING,
    },
    state: {
        type: sequelize_1.DataTypes.STRING,
    },
    phone: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    pincode: {
        type: sequelize_1.DataTypes.INTEGER,
    }
}, {
    sequelize: db_1.default,
    modelName: 'Address'
});
User_1.default.hasMany(Address);
Address.belongsTo(User_1.default);
exports.default = Address;
