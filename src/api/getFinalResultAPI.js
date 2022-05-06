import {getRequest} from './utils';

export const getFinalResultAPI = () =>
  getRequest('/quiz_performance/final_score/');
