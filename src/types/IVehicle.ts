import IImage from "./IMage";

export default interface IVehicle {
    id: number;
    name: string;
    created_at: string;
    model: string;
    price: number;
    year: number;
    km: number;
    engine: string;
    color: string;
    plate: string;
    gearbox: string;
    fuel: string;
    doorsNumber: number;
    optionals: string;
    comments: string;
    status: string;
    views: number;
    images: IImage[];
}

