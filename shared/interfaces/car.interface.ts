export interface Car {
    id: number;
    name: string;
    model: Model;
    userId: number;
}


export interface Model {
    id: number;
    name: string;
    sensors: Sensor[];

}

export interface Sensor {
    id: number;
    name: string;
    type: string;
    value: number;
    description: number;
}