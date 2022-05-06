import {postRequest} from './utils';

export const getResultAPI = data => postRequest('/quiz_marks/record/iq/', data);
