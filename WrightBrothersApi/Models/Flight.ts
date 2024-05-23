enum FlightStatus {
    Scheduled = 'Scheduled',
    Boarding = 'Boarding',
    Departed = 'Departed',
    InAir = 'InAir',
    Landed = 'Landed',
    Cancelled = 'Cancelled',
    Delayed = 'Delayed'
}

class Flight {
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

    constructor(id: number, flightNumber: string, origin: string, destination: string, departureTime: Date, arrivalTime: Date, status: FlightStatus, fuelRange: number, fuelTankLeak: boolean, flightLogSignature: string, aerobaticSequenceSignature: string) {
        this.id = id;
        this.flightNumber = flightNumber;
        this.origin = origin;
        this.destination = destination;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.status = status;
        this.fuelRange = fuelRange;
        this.fuelTankLeak = fuelTankLeak;
        this.flightLogSignature = flightLogSignature;
        this.aerobaticSequenceSignature = aerobaticSequenceSignature;
    }
}

export { Flight, FlightStatus };