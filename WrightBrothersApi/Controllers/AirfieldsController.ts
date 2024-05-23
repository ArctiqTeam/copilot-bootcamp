import express, { Request, Response } from 'express';
    import { Airfield } from '../Models/Airfield';

    class AirfieldsController {
        private airfields: Airfield[];

        public router = express.Router();

        constructor() {
            this.airfields = [
                new Airfield(1, "Kitty Hawk", "North Carolina", "1900-3000", "First successful flight"),
                new Airfield(2, "Huffman Prairie", "Ohio", "1904-1905", "First practical airplane"),
                new Airfield(3, "Fort Myer", "Virginia", "1908-1909", "Military flight trials")
            ];

            this.router.get('/', this.getAirfields.bind(this));
            this.router.get('/:id', this.getAirfield.bind(this));
            this.router.post('/', this.postAirfield.bind(this));
            this.router.delete('/:id', this.deleteAirfield.bind(this));
            this.router.put('/:id', this.updateAirfield.bind(this));
        }

        // GET: 
        getAirfields(req: Request, res: Response) {
            res.send(this.airfields);
        }

        // GET: 3
        getAirfield(req: Request, res: Response): void {
            const id = parseInt(req.params.id);
            if (id < 0 || id >= this.airfields.length) {
                res.status(404).send("Airfield not found");
            }
            res.status(200).send(this.airfields[id]);
        }

        // POST: 
        postAirfield(req: Request, res: Response): void {
            const airfield: Airfield = req.body;
            this.airfields.push(airfield);
            res.status(201).send(airfield);
        }

        // DELETE:
        deleteAirfield(req: Request, res: Response): void {
            const id = parseInt(req.params.id);
            const index = this.airfields.findIndex(a => a.id === id);
            if (index === -1) {
                res.status(404).send("Airfield not found");
                return;
            }

            this.airfields.splice(index, 1);
            res.status(200).send("Airfield with id: " + id + " deleted");
        }

        // PUT: 2
        updateAirfield(req: Request, res: Response): void {
            const id = parseInt(req.params.id);
            const index = this.airfields.findIndex(a => a.id === id);
            if (index === -1) {
                res.status(404).send("Airfield not found");
                return;
            }
            const airfield: Airfield = req.body
            this.airfields[index] = airfield;
            res.status(200).send(airfield);
        }
    }

    export default new AirfieldsController().router;