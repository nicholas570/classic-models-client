export interface Office {
  officeCode: string;
  city: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  state: string;
  country: string;
  postalCode: string;
  territory: string;
}

export interface OfficeCode {
  name: Offices;
  code: string;
}

enum Offices {
  San_Francisco = 'San Francisco',
  Boston = 'Boston',
  NYC = 'NYC',
  Paris = 'Paris',
  Tokyo = 'Tokyo',
  Sydney = 'Sydney',
  London = 'London'
}

export const offices: OfficeCode[] = [
  { name: Offices.San_Francisco, code: '1' },
  { name: Offices.Boston, code: '2' },
  { name: Offices.NYC, code: '3' },
  { name: Offices.Paris, code: '4' },
  { name: Offices.Tokyo, code: '5' },
  { name: Offices.Sydney, code: '6' },
  { name: Offices.London, code: '7' }
];
