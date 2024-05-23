class Airfield {
    id: number;
    name: string;
    location: string;
    datesOfUse: string;
    significance: string;

    constructor(id: number, name: string, location: string, datesOfUse: string, significance: string) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.datesOfUse = datesOfUse;
        this.significance = significance;
    }
}

export { Airfield };