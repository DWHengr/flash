import Http from '../utils/axios';

export default {
  get() {
    return Http.get('/v1/test/list');
  },
};
