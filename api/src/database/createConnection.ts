import { createConnection, Connection } from 'typeorm';

import * as entities from 'entities';

const createDatabaseConnection = (): Promise<Connection> =>
  createConnection({
    type: 'mongodb',
    database: 'mgdb',
    port: 27017,
    entities: Object.values(entities),
    synchronize: true,
    useUnifiedTopology: true
  });

export default createDatabaseConnection;