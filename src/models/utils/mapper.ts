import { map } from 'lodash';
import { Office, OfficeDescription } from '../api/offices';

export const toOfficeCode = (offices: Office[]): OfficeDescription[] => {
  const officesCode = map(offices, (o) => {
    const office: OfficeDescription = { city: o.city, code: o.officeCode };
    return office;
  });
  return officesCode;
};
