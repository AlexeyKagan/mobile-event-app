import mongoose from "mongoose";

import config from '../config/config.json';

export function setUpConnection() {
  mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
  // mongoose.connect('mongodb://f7765499b9067a1f6fd76e1a26eeefa2:qweqe@32-1a.mongo.evennode.com:27017/f7765499b9067a1f6fd76e1a26eeefa2?replicaSet=eusbg1');
}
