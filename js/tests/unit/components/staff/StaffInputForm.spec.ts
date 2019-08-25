import { createLocalVue, mount, RouterLinkStub, shallowMount } from '@vue/test-utils';
import Element from 'element-ui';
import StaffInputForm from '@/components/staff/StaffInputForm.vue';
import flushPromises from 'flush-promises';

describe('Staff input form component test', () => {

    const localVue = createLocalVue();
    localVue.use(Element);

    const wrapper = mount(StaffInputForm, {
        localVue,
        stubs: {
            RouterLink: RouterLinkStub,
        },
        propsData: {
            staffProp: {
                dialogVisible: true,
                name: '',
                title: '',
            },
        },
    });

    it('click StaffInputForm component save button', async () => {

        const mockStaff = {
            clear: jest.fn(),
            save: jest.fn().mockResolvedValue('1'),
            name: 'name1',
            title: 'title1',
        };

        wrapper.setData({
            staff: mockStaff,
        });

        wrapper.find('#staff-input-form-save').trigger('click');

        expect(mockStaff.save).toHaveBeenCalled();
        await flushPromises();
        expect(mockStaff.clear).toHaveBeenCalled();
        expect(wrapper.emitted()).toEqual({staffDataSaved: [[]]});
    });
});
