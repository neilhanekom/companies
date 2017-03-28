export interface Company {
  id: string,
  name: string,
  address: string,
  city: string,
  country: string,
  email?: string,
  contact?: string,
  directors: Array<any>
}