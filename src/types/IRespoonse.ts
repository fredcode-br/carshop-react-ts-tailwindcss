import IVehicle from "./IVehicle";

export interface IResponse {
    vehicles: IVehicle[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
  }