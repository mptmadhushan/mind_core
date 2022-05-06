import {getRequest} from './utils';

export const getOverallResultAPI = () =>
  getRequest('/quiz_performance/overall_score/');
