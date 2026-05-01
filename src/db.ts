import knex from "knex";
import { Model } from "objection";
const knexConfig = require("../knexfile");
import pg from 'pg';
pg.types.setTypeParser(1082, (val: string) => val);

const db = knex(knexConfig.development);
Model.knex(db);

export default db;