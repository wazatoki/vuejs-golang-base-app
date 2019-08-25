import { BASE_URL, CLIENT} from '@/utils/ajaxUtils';
import MockAdapter from 'axios-mock-adapter';
import StaffApi, {} from '@/api/StaffApi';
import StaffType from '@/components/models/StaffInterface';

describe('staffapi test', () => {

    const mockAxios = new MockAdapter(CLIENT);

    it('create', async () => {

        mockAxios.reset();
        mockAxios
            .onPost(BASE_URL + StaffApi.API_BASE + '/create')
            .reply(200, { id: '1', staffId: 'STAFF_ID', name: 'NAME', password: 'PASSWORD' });

        const data: StaffType = {id: '', staffId: 'STAFF_ID', name: 'NAME', password: 'PASSWORD'};

        const res = await StaffApi.create(data);
        mockAxios.reset();

        return expect(res.id).toEqual('1');
    });

    it('update', async () => {

        mockAxios.reset();
        mockAxios
            .onPut(BASE_URL + StaffApi.API_BASE + '/update')
            .reply(200, true);

        const data: StaffType = {id: '1', staffId: 'STAFF_ID', name: 'NAME', password: 'PASSWORD'};

        const res = await StaffApi.update(data);
        mockAxios.reset();

        return expect(res).toEqual(true);
    });

    it('read', async () => {

        mockAxios.reset();
        mockAxios
            .onGet(BASE_URL + StaffApi.API_BASE + '/1')
            .reply(200, { id: '1', staffId: 'STAFF_ID', name: 'NAME', password: 'PASSWORD' });

        const id: string = '1';

        const res = await StaffApi.read(id);
        mockAxios.reset();

        return expect(res).toEqual({ id: '1', staffId: 'STAFF_ID', name: 'NAME', password: 'PASSWORD' });
    });

    it('delete', async () => {

        mockAxios.reset();
        mockAxios
            .onDelete(BASE_URL + StaffApi.API_BASE + '/delete')
            .reply(200, true);

        const idList: string[] = ['1', '2', '3', '4'];

        const res = await StaffApi.delete(idList);
        mockAxios.reset();

        return expect(res).toEqual(true);
    });

    it('search', async () => {

        mockAxios.reset();
        mockAxios
            .onGet(BASE_URL + StaffApi.API_BASE + '/search')
            .reply(200, [
                { id: '1', staffId: 'STAFF_ID1', name: 'NAME1', password: 'PASSWORD1' },
                { id: '2', staffId: 'STAFF_ID2', name: 'NAME2', password: 'PASSWORD2' },
                { id: '3', staffId: 'STAFF_ID3', name: 'NAME3', password: 'PASSWORD3' },
            ]);

        const searchStrings: string = 'NAME PASSWORD';

        const res = await StaffApi.search(searchStrings);
        mockAxios.reset();

        return expect(res).toEqual([
          { id: '1', staffId: 'STAFF_ID1', name: 'NAME1', password: 'PASSWORD1' },
          { id: '2', staffId: 'STAFF_ID2', name: 'NAME2', password: 'PASSWORD2' },
          { id: '3', staffId: 'STAFF_ID3', name: 'NAME3', password: 'PASSWORD3' },
        ]);
    });
});
