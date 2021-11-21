import { AxiosErrorResponse, ResponseContent } from '../../models/api/response';

export const loginErrorMock: AxiosErrorResponse<ResponseContent<any>> = {
  response: {
    data: {
      payload: {
        status: 404,
        message: 'Employee xxxxxx not found'
      }
    },
    status: 404,
    statusText: 'Not Found',
    headers: {},
    config: {},
    request: {}
  },
  name: '',
  config: {},
  request: {},
  toJSON: () => Object,
  isAxiosError: true,
  message: ''
};
