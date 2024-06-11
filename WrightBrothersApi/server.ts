import express, { Request, Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import PlanesController from './Controllers/PlanesController';
import FlightsController from './Controllers/FlightsController';
// import AirfieldsController from './Controllers/AirfieldsController';

const swaggerDocument = YAML.load('./swagger.yaml');

const app = express();

// Add CORS policy
app.use(cors());

// Add JSON body parsing
app.use(express.json());

// Add health check endpoint
app.get('/health', (req: Request, res: Response) => {
    const atCruisingAltitude = checkSystemPerformance();

    if (atCruisingAltitude) {
        res.status(200).send('The application is cruising smoothly at optimal altitude.');
    } else {
        const minorIssue = checkIfMinorIssue();

        if (minorIssue) {
            res.status(200).send('The application is experiencing turbulence but remains stable.');
        } else {
            res.status(500).send('The application is facing a system failure and needs immediate attention.');
        }
    }
});

// Simulate a check to determine if the application is "at cruising altitude"
const checkSystemPerformance = (): boolean => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    return randomNumber > 10;
}

// Simulate a check to determine if the application is "at cruising altitude"
const checkIfMinorIssue = (): boolean => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    return randomNumber > 50;
}

// Add Swagger/OpenAPI
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Initialize the controllers
const planesController = new PlanesController();
const flightsController = new FlightsController();

// define the routes for the controllers
app.use('/planes', planesController.getRouter());
app.use('/flights', flightsController.getRouter());

// Add the airfields controller
// const airfieldsController = new AirfieldsController();
// app.use('/airfields', airfieldsController.getRouter();

// Redirect root to Swagger UI
app.get('/', (req: Request, res: Response) => {
    res.redirect('/swagger');
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});