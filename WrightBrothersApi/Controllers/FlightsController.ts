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

class flightsController {
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
            )
        ];

        this.router.get('/', this.getAllFlights.bind(this));
        this.router.post('/', this.createFlight.bind(this));
        this.router.get('/:id', this.getFlight.bind(this));
        this.router.post('/:id/status', this.updateStatus.bind(this));
        this.router.post('/:id/takeFlight/:flightLength', this.takeFlight.bind(this));
        this.router.post('/:id/lightningStrike', this.lightningStrike.bind(this));
        this.router.post('/:id/calculateAerodynamics', this.calculateAerodynamics.bind(this));
    }

    private getAllFlights(req: Request, res: Response) {
        console.log("GET all ✈️✈️✈️ NO PARAMS ✈️✈️✈️");
        res.json(this.flights);
    }

    private createFlight(req: Request, res: Response) {
        const flight: IFlight = req.body;
        this.flights.push(new Flight(
            flight.id,
            flight.flightNumber,
            flight.origin,
            flight.destination,
            flight.departureTime,
            flight.arrivalTime,
            flight.status,
            flight.fuelRange,
            flight.fuelTankLeak,
            flight.flightLogSignature,
            flight.aerobaticSequenceSignature
        ));
        const newFlight = this.flights.find(f => f.id === flight.id);
        res.status(201).json(newFlight);
    }

    private getFlight(req: Request, res: Response) {
        // Implement your logic for GET request
        res.status(200).send(req.body);
    }

    private updateStatus(req: Request) {
        const id = parseInt(req.params.id);
        const newStatus = req.body.status;
        const flight = this.flights.find(f => f.id === id);
        if (flight) {
            switch (newStatus) {
            case 'Boarding':
                if (new Date() > flight.departureTime) {
                    return { status: 400, message: "Cannot board, past departure time." };
                }
                break;
            case 'Departed':
                if (flight.status !== 'Boarding') {
                    return { status: 400, message: "Flight must be in 'Boarding' status before it can be 'Departed'." };
                }
                break;
            case 'InAir':
                if (flight.status !== 'Departed') {
                    return { status: 400, message: "Flight must be in 'Departed' status before it can be 'In Air'." };
                }
                break;
            case 'Landed':
                if (flight.status !== 'InAir') {
                    return { status: 400, message: "Flight must be in 'In Air' status before it can be 'Landed'." };
                }
                break;
            case 'Cancelled':
                if (new Date() > flight.departureTime) {
                    return { status: 400, message: "Cannot cancel, past departure time." };
                }
                break;
            case 'Delayed':
                if (flight.status === 'Cancelled') {
                    return { status: 400, message: "Cannot delay, flight is cancelled." };
                }
                break;
            default:
                return { status: 400, message: "Unknown or unsupported flight status." };
            }

            flight.status = newStatus;

            return { status: 200, message: `Flight status updated to ${newStatus}.` };
        } else {
            return { status: 404, message: "Flight not found." };
        }
    }

    private takeFlight(req: Request, res: Response): void {
        const id = parseInt(req.params.id);
        const flightLength = parseInt(req.params.flightLength);
        const flight = this.flights.find(f => f.id === id);

        if (!flight) {
            res.status(404).send("Flight not found");
            return;
        }

        let FuelConsumption = 0;
        if (flight.fuelTankLeak) {
            FuelConsumption = 2;
        }

        for (let i = 0; i < flightLength; i++) {
            if (flight.fuelRange <= 0) {
                res.status(500).send("Plane crashed, due to lack of fuel");
                return;
            }
            flight.fuelRange -= FuelConsumption;
        }

        res.status(200).send(`Flight took off and flew ${flightLength} kilometers/miles.`);
    }

    private lightningStrike(req: Request, res: Response) {
        // Implement your logic for lightning strike
        res.status(200).send(req.body);
    }

    private calculateAerodynamics(req: Request, res: Response) {
        // Implement your logic for calculating aerodynamics
        res.status(200).send(req.body);
    }

    public getRouter() {
        return this.router;
    }
}

export default flightsController;
