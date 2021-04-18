import { Currency } from "./currency.interface";

export interface DataSource{
    read(message:string):Currency[];
}