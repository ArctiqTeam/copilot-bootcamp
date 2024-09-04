import express, { Request, Response } from 'express';
import { Flight, FlightStatus } from '../Models/Flight';
import pool from '../Database';
const fs = require('fs');

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
                "171203-FFA-MEO-WB001",
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
                "171203-FFA-MEO-WB002",
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
                "171203-FFA-MEO-WB003",
                "L4B-H2C-R3A-S1D-T2E"
            )
        ];

        this.router.get('/', this.getAllFlights.bind(this));
        this.router.post('/', this.createFlight.bind(this));
        this.router.get('/:id', this.getFlight.bind(this));
        this.router.post('/:id/status', this.updateStatus.bind(this));
        this.router.post('/:id/takeFlight/:flightLength', this.takeFlight.bind(this));
        this.router.post('/:id/calculatePropulsion', this.calculatePropulsion.bind(this));
        this.router.post('/log', this.saveFlightLog.bind(this));
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

    // Define a function to parse coordinate string, example: "35.6764N,139.6500E", "34.9285S,138.6007E"
    private parse(coordinate: string): { latitude: number, longitude: number } {
        const arr = coordinate.split(',');

        // Parse latitude
        let match = arr[0].match(/^([0-9.]+)([NS])$/);
        if (!match) {
            throw new Error('Invalid latitude format');
        }
        let latitude = parseFloat(match[1]);
        if (match[2] === 'S') {
            latitude = -latitude;
        }

        // Parse longitude
        match = arr[1].match(/^([0-9.]+)([EW])$/);
        if (!match) {
            throw new Error('Invalid longitude format');
        }
        let longitude = parseFloat(match[1]);
        if (match[2] === 'W') {
            longitude = -longitude;
        }

        return { latitude, longitude };
    }

    private async saveFlightLog(req: Request, res: Response): Promise<void> {
        const flightNumber = req.body.flightNumber;
        const message = req.body.message;
        const query = `
            INSERT INTO flight_logs (flight_id, message)
            VALUES (${flightNumber}, '${message}')
        `;

        try {
            await pool.query(query);
        } catch (err: any) {
            console.error('Error saving flight log:', err.message);
        }
    }

    private generateFlightItinerary(legs: { flightNumber: string, departure: string, arrival: string }[]): string {
        let itineraryParts: string[] = [];
        
        for (let i = 0; i < legs.length; i++) {
            itineraryParts.push(
                "Flight " + (i + 1) + ": " +
                "Flight Number: " + legs[i].flightNumber + ", " +
                "Departure: " + legs[i].departure + ", " +
                "Arrival: " + legs[i].arrival
            );
        }
        
        let itinerary = itineraryParts.join("\n") + "\n";
        
        fs.appendFileSync('itinerary_log.txt', itinerary);
    
        return itinerary;
    }

    private calculatePropulsion(req: Request, res: Response): void {
        const start = 91;
        const end = 200000;
        const startTime = Date.now();

        let primeCount = this.calculatePrimes(start, end);

        const endTime = Date.now();
        const timeTaken = endTime - startTime;
        console.log(`Found ${primeCount} prime numbers between ${start} and ${end}`);
        console.log(`Time taken for calculation: ${timeTaken} ms`);

        res.status(200).send(`Propulsion is successfully calculated: ${primeCount}`);
    }

    private calculatePrimes(start: number, end: number): number {
        let primeCount = 0;
        for (let i = start; i < end; i++) {
            if (this.isPrime(i)) {
                primeCount++;
            }
        }
        return primeCount;
    }

    private isPrime(num: number): boolean {
        if (num <= 1) return false;
        for (let i = 2; i < num; i++) {
            if (num % i === 0) return false;
        }
        return true;
    }

    public getRouter() {
        return this.router;
    }
}

export default flightsController;
