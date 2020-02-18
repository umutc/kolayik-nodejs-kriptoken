import { createConnection, Connection } from 'typeorm';

import * as entities from 'entities';

const createDatabaseConnection = (): Promise<Connection> =>
  createConnection({
    type: 'mongodb',
    url: process.env.MONGOLAB_URI || "mongodb://localhost:27017/mgdb",
    entities: Object.values(entities),
    synchronize: true,
    useUnifiedTopology: true
  });

export default createDatabaseConnection;