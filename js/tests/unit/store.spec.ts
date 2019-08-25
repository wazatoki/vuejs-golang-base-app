import { createLocalVue, mount, RouterLinkStub, shallowMount } from '@vue/test-utils';
import StaffType from '@/components/models/StaffInterface';
import { state, mutations, actions } from '@/store';
import StaffApi from '@/api/StaffApi';

const resultArray = [
  { id: '1', staffId: 'STAFF_ID1', name: 'NAME1', password: 'PASSWORD1' },
  { id: '2', staffId: 'STAFF_ID2', name: 'NAME2', password: 'PASSWORD2' },
  { id: '3', staffId: 'STAFF_ID3', name: 'NAME3', password: 'PASSWORD3' },
  { id: '4', staffId: 'STAFF_ID4', name: 'NAME4', password: 'PASSWORD4' },
  { id: '5', staffId: 'STAFF_ID5', name: 'NAME5', password: 'PASSWORD5' },
];

jest.mock('@/api/StaffApi', () => {
    return {
        search: jest.fn().mockResolvedValue([
          { id: '1', staffId: 'STAFF_ID1', name: 'NAME1', password: 'PASSWORD1' },
          { id: '2', staffId: 'STAFF_ID2', name: 'NAME2', password: 'PASSWORD2' },
          { id: '3', staffId: 'STAFF_ID3', name: 'NAME3', password: 'PASSWORD3' },
          { id: '4', staffId: 'STAFF_ID4', name: 'NAME4', password: 'PASSWORD4' },
          { id: '5', staffId: 'STAFF_ID5', name: 'NAME5', password: 'PASSWORD5' },
        ]),
        delete: jest.fn().mockResolvedValue(true),
    };
});

describe('store test', () => {

    const { set, reset } = mutations;

    it('SET', () => {
        const state1 = { items: [] as  StaffType[]};
        set(state1, [{ id: 'id1', staffId: 'STAFF_ID1', name: 'NAME1', password: 'PASSWORD1' }]);
        expect(state1.items[0].id).toBe('id1');
    });

    it('RESET', () => {
        const state1 = { items: [{ id: '1', staffId: 'STAFF_ID1', name: 'NAME1', password: 'PASSWORD1' }] as  StaffType[]};
        reset(state1);
        expect(state1.items.length).toBe(0);
    });

    it('FETCH', async () => {
        const context = {
            commit: jest.fn(),
        };
        const res = await actions.fetch(context, 'aaa');
        expect(context.commit).toHaveBeenCalledWith('set', resultArray);
    });

    it('DELETE', async () => {
        const context = {};
        const res = await actions.delete(context, ['1', '2', '3']);
        expect(StaffApi.delete).toHaveBeenCalledWith(['1', '2', '3']);
    });
});
