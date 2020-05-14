import {
  ConnectionOptions,
  getConnectionOptions,
  createConnection,
} from 'typeorm';

export default async function exportDatabase(): Promise<void> {
  let connectionOptions: ConnectionOptions = await getConnectionOptions(
    'EnvenvMainDatabase'
  );

  if (process.env.NODE_ENV === 'test') {
    connectionOptions = await getConnectionOptions('EnvenvMockDatabase');
  }

  await createConnection({ ...connectionOptions, name: 'default' });
}
