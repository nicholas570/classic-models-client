import { History } from 'history';

export const navigate = (history: History, path: string) => history.push(path);
