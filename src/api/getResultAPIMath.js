import {postRequest} from './utils';

export const getResultAPIMath = data =>
  postRequest('/quiz_marks/record/math/', data);
