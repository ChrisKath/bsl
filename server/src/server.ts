import 'reflect-metadata'
import App from './app'
import { port, production } from './configs/app'

// Initialize app
const app = new App(port, production)

// Srart server
app.listen()