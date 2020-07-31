import { createConnection, ConnectionOptions, Connection } from 'typeorm'
import { join } from 'path'
export { ClickEntity as Click } from './entity/click'
export { FacebookEntity as Facebook } from './entity/facebook'
export { IconEntity as Icon } from './entity/icon'
export { TagEntity as Tag } from './entity/tag'
export { TaggingEntity as Tagging } from './entity/tagging'
export { UrlEntity as Url } from './entity/url'
export { UserEntity as User } from './entity/user'

/**
 * ConnectionOptions is an interface with settings and options for specific connection.
 * Options contain database and other connection-related settings.
 * Consumer must provide connection options for each of your connections.
 */
const connectionOptions: ConnectionOptions = {
  type: process.env.DB_CONNECTION as any,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as any,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  synchronize: false,
  logging: ['error', 'warn', 'schema', 'query', 'log'], // https://typeorm.io/#/logging
  logger: 'advanced-console',
  entities: [
    join(__dirname, '/entity/*{.ts,.js}')
  ],
  migrationsRun: false
}

/**
 * Creates a new connection and registers it in the manager.
 */
export async function createDatabaseConnection (): Promise<void> {
  console.info('[server] Database connecting...')

  try {
    const connection: Connection = await createConnection(connectionOptions)
    if (connection.isConnected) {
      console.info('[server] Database connection completed.')
    } else {
      console.info('[server] Database connection failed!')
    }
  } catch (error) {
    console.error(error)
  }
}
