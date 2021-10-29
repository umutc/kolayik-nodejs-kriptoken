import { createConnection, Connection } from 'typeorm';
import * as entities from 'entities';

const connectionString = process.env.MONGODB_URI || "mongodb://localhost:27017/mgdb";
console.log('connectionString: ', connectionString);

const createDatabaseConnection = (): Promise<Connection> =>
  createConnection({
    type: 'mongodb',
    url: connectionString,
    entities: Object.values(entities),
    synchronize: true,
    useUnifiedTopology: true
  });

export default createDatabaseConnection;