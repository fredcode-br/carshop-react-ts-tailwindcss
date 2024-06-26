import IVehicleType from "./IVehicleType";

export default interface ICategory {
    id: string;
    name: string;
    created_at?: string; 
    vehicleType: IVehicleType;
}