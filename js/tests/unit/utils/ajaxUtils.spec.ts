import { BASE_URL, CLIENT} from '@/utils/ajaxUtils';

describe('ajaxUtil test', () => {

    it('BASE_URL is collect', () => {
        return expect(BASE_URL).toEqual(window.location.origin + '/api');
    });
});
