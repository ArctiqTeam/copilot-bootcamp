class Airfield {
    public id: number;
    public name: string;
    public location: string;
    public datesOfUse: string;
    public significance: string;

    constructor(id: number, name: string, location: string, datesOfUse: string, significance: string) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.datesOfUse = datesOfUse;
        this.significance = significance;
    }
}

export { Airfield };