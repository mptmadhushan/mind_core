import {postRequest} from './utils';

export const getFinalPredictApi = data =>
  postRequest('/predict-performance/', data);
