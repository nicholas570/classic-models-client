import { officesMock } from '../../test/mocks/officesMock';
import { OfficeDescription } from '../api/offices';
import { toOfficeCode } from '../utils/mapper';

describe('offices mapper', () => {
  const offices = toOfficeCode(officesMock);

  it('should have the payload length', () => {
    expect(offices.length).toEqual(officesMock.length);
  });
  it('should return object of type OfficeCode', () => {
    offices.forEach((o, i) => {
      const officeCode: OfficeDescription = {
        city: officesMock[i].city,
        code: officesMock[i].officeCode
      };
      expect(o).toMatchObject(officeCode);
    });
  });
});
