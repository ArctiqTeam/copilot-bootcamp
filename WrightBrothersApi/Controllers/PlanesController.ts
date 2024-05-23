import express, { Request, Response } from 'express';
import { Plane } from '../Models/Plane';

interface IPlane {
    id: number;
    name: string;
    year: number;
    description: string;
    rangeInKm: number;
}

class PlanesController {
    private router: express.Router;
    private planes: IPlane[];

    constructor() {
        this.router = express.Router();
        this.planes = [
            {
                id: 1,
                name: "Wright Flyer",
                year: 1903,
                description: "The first successful heavier-than-air powered aircraft.",
                rangeInKm: 12
            },
            {
                id: 2,
                name: "Wright Flyer II",
                year: 1904,
                description: "A refinement of the original Flyer with better performance.",
                rangeInKm: 24
            },
            {
                id: 3,
                name: "Wright Model A",
                year: 1908,
                description: "The first commercially successful airplane.",
                rangeInKm: 40
            }
        ];

        this.router.get('/', this.getAllPlanes.bind(this));
        this.router.get('/:id', this.getPlaneById.bind(this));
        this.router.post('/', this.createPlane.bind(this));
    }

    public getRouter() {
        return this.router;
    }

    private getAllPlanes(req: Request, res: Response) {
        console.log("GET all planes");
        res.json(this.planes);
    }

    private getPlaneById(req: Request, res: Response) {
        const planeId = Number(req.params.id);
        const plane = this.planes.find(plane => plane.id === planeId);

        if (!plane) {
            res.status(404).send('Plane not found');
        }

        res.json(plane);
    }

    private createPlane(req: Request, res: Response) {
        const { id, name, year, description, rangeInKm } = req.body;
        const plane = new Plane(id, name, year, description, rangeInKm);

        if (!plane) {
            res.status(400).send('Bad request');
        }

        this.planes.push(plane);
        res.status(201).json(plane);
    }

}

export default new PlanesController().getRouter();