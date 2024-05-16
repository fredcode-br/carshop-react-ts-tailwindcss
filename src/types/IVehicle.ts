import ICategory from "./ICategory";
import IImage from "./IMage";
import IManufacturer from "./IManufacturer";
import IVehicleType from "./IVehicleType";

export default interface IVehicle {
    id: string;
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
    vehicleType?: IVehicleType | null;
    category?: ICategory | null;
    manufacturer?: IManufacturer  | null;
}

