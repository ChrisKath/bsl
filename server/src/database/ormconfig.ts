import { join } from 'path'
import { ConnectionOptions } from 'typeorm'
import { production } from '@/configs/app'

const connectionOptions: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: '',
  synchronize: false, // We are using migrations, synchronize should be set to false.
  dropSchema: false,
  migrationsRun: false, // Run migrations automatically, you can disable this if you prefer running migration manually.
  logging: ['warn', 'error'],
  logger: production ? 'file' : 'debug',
  entities: [
    join(__dirname, 'entity/*{.ts,.js}'),
  ],
  migrations: [
    join(__dirname, 'migrations/*{.ts,.js}')
  ]
}

export default connectionOptions