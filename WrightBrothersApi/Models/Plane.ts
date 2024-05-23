class Plane {
    id: number;
    name: string;
    year: number;
    description: string;
    rangeInKm: number;

    constructor(id: number, name: string, year: number, description: string, rangeInKm: number) {
        this.id = id;
        this.name = name;
        this.year = year;
        this.description = description;
        this.rangeInKm = rangeInKm;
    }
}

export { Plane };