import { createLocalVue, mount, RouterLinkStub, shallowMount } from '@vue/test-utils';
import Element from 'element-ui';
import Home from '@/views/Home.vue';
import StaffType from '@/components/models/StaffInterface';
import StaffInputDialog from '@/components/staff/StaffInputDialog.vue';
import StaffReadDialog from '@/components/staff/StaffReadDialog.vue';
import flushPromises from 'flush-promises';
import Vuex from 'vuex';

describe('Home component test', () => {

    const localVue = createLocalVue();
    localVue.use(Element);
    localVue.use(Vuex);

    const actions = {
        fetch: jest.fn( ({ commit }) => {
            commit('set', [{ id: '1', staffId: 'STAFF_ID1', name: 'NAME1', password: 'PASSWORD1' }]);
            return Promise;
        }),
        delete: jest.fn().mockResolvedValue(true),
    };

    const store = new Vuex.Store({
        state: {
          items: [] as StaffType[],
        },
        mutations: {
          set(state, payload: StaffType[]) {
            state.items = payload;
          },
          reset(state) {
            state.items = [];
          },
        },
        actions,
      });

    const wrapper = mount(Home, {
        localVue,
        store,
        stubs: {
            RouterLink: RouterLinkStub,
        },
    });

    it('activate Home component', () => {

        expect(wrapper.contains('div.home')).toBe(true);
    });

    it('click Home component search button', async () => {

        wrapper.find('#onSearch').trigger('click');

        await flushPromises();
        expect(actions.fetch).toHaveBeenCalled();
    });

    it('click Home component create button', () => {

        const mockStaff = {
            clear: jest.fn(),
        };

        wrapper.setData({
            staff: mockStaff,
            formTitle: '',
            staffInputFormVisible: false,
        });

        wrapper.find('#handleCreate').trigger('click');

        expect(mockStaff.clear).toHaveBeenCalled();
        expect(wrapper.vm.$data.formTitle).toBe('新規作成');
        expect(wrapper.vm.$data.staffInputFormVisible).toBe(true);
    });

    it('click Home component delete button', (done) => {

        const testData: StaffType[] = [
          { id: '1', staffId: 'STAFF_ID1', name: 'NAME1', password: 'PASSWORD1' },
          { id: '2', staffId: 'STAFF_ID2', name: 'NAME2', password: 'PASSWORD2' },
          { id: '3', staffId: 'STAFF_ID3', name: 'NAME3', password: 'PASSWORD3' },
        ];

        wrapper.setData({
            multipleSelection: testData,
        });

        wrapper.find('#handleDelete').trigger('click');

        expect(actions.delete).toHaveBeenCalled();
        wrapper.vm.$nextTick(() => {
            expect(actions.fetch).toHaveBeenCalled();
            done();
        });
    });

    it('click Home component edit button', async () => {

        const testData: StaffType[] = [
            { id: '1', staffId: 'STAFF_ID1', name: 'NAME1', password: 'PASSWORD1' },
        ];
        const mockStaff = {
            fetch: jest.fn().mockResolvedValue({ id: '1', staffId: 'STAFF_ID1', name: 'NAME1', password: 'PASSWORD1' }),
        };

        wrapper.setData({
            staff: mockStaff,
            tableData: testData,
            formTitle: '',
            staffInputFormVisible: false,
        });

        wrapper.find('.handleEdit').trigger('click');

        expect(mockStaff.fetch).toHaveBeenCalledWith('1');
        expect(wrapper.vm.$data.formTitle).toBe('更新');
        await flushPromises();
        expect(wrapper.vm.$data.staffInputFormVisible).toBe(true);
    });

    it('click Home component read button', async () => {

        const testData: StaffType[] = [
            { id: '1', staffId: 'STAFF_ID1', name: 'NAME1', password: 'PASSWORD1' },
        ];
        const mockStaff = {
            fetch: jest.fn().mockResolvedValue({ id: '1', staffId: 'STAFF_ID1', name: 'NAME1', password: 'PASSWORD1' }),
        };

        wrapper.setData({
            staff: mockStaff,
            tableData: testData,
            staffReadFormVisible: false,
        });

        wrapper.find('.handleRead').trigger('click');
        expect(mockStaff.fetch).toHaveBeenCalledWith('1');
        await flushPromises();
    });

    it('staff input form close', () => {
        wrapper.setData({
            staffInputFormVisible: true,
        });
        wrapper.find(StaffInputDialog).vm.$emit('staffInputDialogClose');
        expect(wrapper.vm.$data.staffInputFormVisible).toBe(false);
    });

    it('staff read form close', () => {
        wrapper.setData({
            staffReadFormVisible: true,
        });
        wrapper.find(StaffReadDialog).vm.$emit('staffReadDialogClose');
        expect(wrapper.vm.$data.staffReadFormVisible).toBe(false);
    });

});
