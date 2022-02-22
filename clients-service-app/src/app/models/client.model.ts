export interface Client {
    id: number,
    name: string,
    surname: string,
    gender: string,
    person_id: string,
    mobile: number,
    legal_address: {legal_country: string, legal_city: string, legal_address: string},
    actual_address: {actual_country: string, actual_city: string, actual_address: string},
}