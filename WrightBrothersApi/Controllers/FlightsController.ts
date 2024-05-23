import express, { Request, Response } from 'express';
import { Flight, FlightStatus } from '../Models/Flight';

interface IFlight {
    id: number;
    flightNumber: string;
    origin: string;
    destination: string;
    departureTime: Date;
    arrivalTime: Date;
    status: FlightStatus;
    fuelRange: number;
    fuelTankLeak: boolean;
    flightLogSignature: string;
    aerobaticSequenceSignature: string;
}

class FlightsController {
    private flights: Flight[];
    private router = express.Router();

    constructor() {
        this.flights = [
            new Flight(
                1,
                "WB001",
                "Kitty Hawk, NC",
                "Manteo, NC",
                new Date(1903, 11, 17, 10, 35, 0),
                new Date(1903, 11, 17, 10, 35+12, 0),
                FlightStatus.Scheduled,
                100,
                false,
                "171203-DEP-ARR-WB001",
                "L4B-H2C-R3A-S1D-T2E"
            ),
            new Flight(
                2,
                "WB002",
                "Kitty Hawk, NC",
                "Manteo, NC",
                new Date(1903, 11, 17, 10, 35, 0),
                new Date(1903, 11, 17, 10, 35+12, 0),
                FlightStatus.Scheduled,
                100,
                false,
                "171203-DEP-ARR-WB002",
                "L4B-H2C-R3A-S1D-T2E"
            ),
            new Flight(
                3,
                "WB003",
                "Kitty Hawk, NC",
                "Manteo, NC",
                new Date(1903, 11, 17, 10, 35, 0),
                new Date(1903, 11, 17, 10, 35+12, 0),
                FlightStatus.Scheduled,
                100,
                false,
                "171203-DEP-ARR-WB003",
                "L4B-H2C-R3A-S1D-T2E"
            ),
        ];

        this.router.post('/', this.createFlight.bind(this));
        this.router.get('/:id', this.getFlight.bind(this));
        this.router.post('/:id/status', this.updateStatus.bind(this));
        this.router.post('/:id/takeFlight/:flightLength', this.takeFlight.bind(this));
        this.router.post('/:id/lightningStrike', this.lightningStrike.bind(this));
        this.router.post('/:id/calculateAerodynamics', this.calculateAerodynamics.bind(this));
    }

    createFlight(req: Request, res: Response) {
        // Implement your logic for POST request
    }

    getFlight(req: Request, res: Response) {
        // Implement your logic for GET request
    }

    updateStatus(req: Request, res: Response) {
        // Implement your logic for updating flight status
    }

    takeFlight(req: Request, res: Response): void {
        const id = parseInt(req.params.id);
        const flightLength = parseInt(req.params.flightLength);
        const flight = this.flights.find(f => f.id === id);

        if (!flight) {
            res.status(404).send("Flight not found");
            return;
        }

        let fuelConsumption = 0;
        if (flight.fuelTankLeak) {
            fuelConsumption = 2;
        }

        for (let i = 0; i < flightLength; i++) {
            if (flight.fuelRange <= 0) {
                res.status(500).send("Plane crashed, due to lack of fuel");
                return;
            }
            flight.fuelRange -= fuelConsumption;
        }

        res.status(200).send(`Flight took off and flew ${flightLength} kilometers/miles.`);
    }

    lightningStrike(req: Request, res: Response) {
        // Implement your logic for lightning strike
    }

    calculateAerodynamics(req: Request, res: Response) {
        // Implement your logic for calculating aerodynamics
    }

    private calculatePrimes(start: number, end: number) {
        // Implement your logic for calculating primes
    }

    private isPrime(number: number) {
        // Implement your logic for checking if a number is prime
    }

    public getRouter() {
        return this.router;
    }
}

export default new FlightsController().getRouter();
