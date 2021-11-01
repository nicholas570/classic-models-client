import { map } from 'lodash';
import { Office, OfficeCode } from '../api/offices';

export const toOfficeCode = (offices: Office[]): OfficeCode[] => {
  const officesCode = map(offices, (office) => {
    return { name: office.city, code: office.officeCode };
  });
  return officesCode;
};
