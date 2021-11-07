import { createApiClient } from '../utils/apiClient';

const apiClient = createApiClient('123');

it('should have a base url', () => {
  expect(apiClient.defaults.baseURL).toEqual(process.env.REACT_APP_SERVER_URL);
});

it('should have a authorization header', () => {
  expect(apiClient.defaults.headers).toMatchObject({ Authorization: `Bearer 123` });
});
