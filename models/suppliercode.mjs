import { seqlz } from "../db.mjs";
import { DataTypes } from "sequelize";

const Suppliercode = seqlz.define("suppliercode", {
  id: {type: DataTypes.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true, unique: true},
  supplier_id: {type: DataTypes.INTEGER, defaultValue: 1},
  component_id: {type: DataTypes.INTEGER, defaultValue: 0},
  manufact_id: {type: DataTypes.INTEGER, defaultValue: 0},
  manufact_pn: { type: DataTypes.TEXT, defaultValue: ''},
  code: { type: DataTypes.TEXT, defaultValue: ''},
  rounding: { type: DataTypes.INTEGER, defaultValue: 1},
  active: { type: DataTypes.BOOLEAN, defaultValue: false},
  price: { type: DataTypes.DOUBLE, defaultValue: 0.0},
  tax: { type: DataTypes.DOUBLE, defaultValue: 0.0},
  url: {
    type: DataTypes.VIRTUAL,
    get() {
      return '/suppliercode/' + this.id;
    }
  }
},
                       {
                         timestamps: false,
                         raw: true
                       });

export default Suppliercode;
