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
    public id: number;
    public flightNumber: string;
    public origin: string;
    public destination: string;
    public departureTime: Date;
    public arrivalTime: Date;
    public status: FlightStatus;
    public fuelRange: number;
    public fuelTankLeak: boolean;
    public flightLogSignature: string;
    public aerobaticSequenceSignature: string;

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