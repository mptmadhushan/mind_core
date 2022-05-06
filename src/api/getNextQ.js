import {postRequest} from './utils';

export const getNextQ = data => postRequest('/question/iq/', data);
