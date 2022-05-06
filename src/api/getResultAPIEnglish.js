import {postRequest} from './utils';

export const getResultAPIEnglish = data =>
  postRequest('/quiz_marks/record/english/', data);
