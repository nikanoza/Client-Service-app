export interface Client {
    id: number,
    name: string,
    surname: string,
    gender: string,
    person_id: string,
    mobile: number,
    legal_address: {country: string, city: string, address: string},
    actual_address: {country: string, city: string, address: string},
}