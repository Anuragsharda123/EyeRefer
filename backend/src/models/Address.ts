import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";
import User from "./User";


class Address extends Model{
    public id?: number;
    public street!: string;
    public district!: string;
    public city!: string;
    public state!: string;
    public phone!: number;
    public pincode!: number;
    public userId!: number;
}

Address.init({
    street: {
        type: DataTypes.STRING,
    },
    district: {
        type: DataTypes.STRING,
    },
    city: {
        type: DataTypes.STRING,
    },
    state:{
        type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.INTEGER,
    },
    pincode: {
        type: DataTypes.INTEGER,
    }
},{
    sequelize,
    modelName:'Address'
})

User.hasMany(Address);
Address.belongsTo(User);

export default Address;
