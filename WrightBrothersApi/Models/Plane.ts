class Plane {
    public id: number;
    public name: string;
    public year: number;
    public description: string;
    public rangeInKm: number;

    constructor(id: number, name: string, year: number, description: string, rangeInKm: number) {
        this.id = id;
        this.name = name;
        this.year = year;
        this.description = description;
        this.rangeInKm = rangeInKm;
    }
}

export default Plane;