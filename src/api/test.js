import Http from '../utils/api';

export default {
  get() {
    return Http.get('/v1/test/list');
  },
};
