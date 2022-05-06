import {getRequest} from './utils';

export const getQuizAPI = () => getRequest('/quiz_questions/iq/');
