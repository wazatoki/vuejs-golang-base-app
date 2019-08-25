import MockAdapter from 'axios-mock-adapter';
import StaffCollection from '../../../../src/components/models/StaffCollection';

const staffCollection = new StaffCollection();
const mockAxios = new MockAdapter(staffCollection.ajaxClient);

describe('StaffCollection fetch test', () => {
    it('fetch', async () => {
        mockAxios.onGet(staffCollection.ajaxBaseUrl + '/search').reply(200, [
            { id: '1', name: 'NAME1', title: 'TITLE1' },
            { id: '2', name: 'NAME2', title: 'TITLE2' },
            { id: '3', name: 'NAME3', title: 'TITLE3' },
        ]);
        staffCollection.reset();
        await staffCollection.fetch('');
        mockAxios.reset();
        return expect(staffCollection.staffList.length).toEqual(3);
    });
});

describe('StaffCollection delete test', () => {
    it('delete', async () => {
        mockAxios.onDelete(staffCollection.ajaxBaseUrl + '/delete').reply(200, true);

        const res = await staffCollection.delete(['4', '5']);
        mockAxios.reset();
        return expect(res).toEqual(true);
    });
});
