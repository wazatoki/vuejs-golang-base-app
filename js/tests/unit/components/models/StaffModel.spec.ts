import { Component, Vue } from 'vue-property-decorator';
import MockAdapter from 'axios-mock-adapter';
import StaffModel from '../../../../src/components/models/StaffModel';
const staffModel = new StaffModel();
const mockAxios = new MockAdapter(staffModel.ajaxClient);

describe('StaffModel save test', () => {
    it('save without id', async () => {
        mockAxios.onPost(staffModel.ajaxBaseUrl + '/create').reply(200, '1as3');
        Vue.set(staffModel, 'id', '');
        Vue.set(staffModel, 'name', 'NAME');
        Vue.set(staffModel, 'title', 'TITLE');
        await staffModel.save();
        mockAxios.reset();
        return expect(staffModel.id).toBe('1as3');
    });

    it('save without id as error', async () => {
        mockAxios.onPost(staffModel.ajaxBaseUrl + '/create').reply(500, '');
        Vue.set(staffModel, 'id', '');
        Vue.set(staffModel, 'name', 'NAME');
        Vue.set(staffModel, 'title', 'TITLE');
        let isSuccess = true;
        await staffModel.save().catch( (res) => {
            isSuccess = false;
        });
        mockAxios.reset();
        return expect(isSuccess).toEqual(false);
    });

    it('save with id', async () => {
        mockAxios.onPut(staffModel.ajaxBaseUrl + '/update').reply(200, { id: '1', name: 'NAME', title: 'TITLE' });
        Vue.set(staffModel, 'id', '1');
        Vue.set(staffModel, 'name', 'NAME');
        Vue.set(staffModel, 'title', 'TITLE');
        await staffModel.save();
        mockAxios.reset();
        return expect(staffModel.id).toEqual('1');
    });

    it('save with id as error', async () => {
        mockAxios.onPut(staffModel.ajaxBaseUrl + '/update').reply(500, '');
        Vue.set(staffModel, 'id', '1');
        Vue.set(staffModel, 'name', 'NAME');
        Vue.set(staffModel, 'title', 'TITLE');
        let isSuccess = true;
        await staffModel.save().catch( (res) => {
            isSuccess = false;
        });
        mockAxios.reset();
        return expect(isSuccess).toEqual(false);
    });
});

describe('StaffModel fetch test', () => {

    it('fetch', async () => {
        mockAxios.onGet(staffModel.ajaxBaseUrl + '/1').reply(200, { id: '1', name: 'NAME', title: 'TITLE' });
        Vue.set(staffModel, 'id', '');
        Vue.set(staffModel, 'name', '');
        Vue.set(staffModel, 'title', '');
        await staffModel.fetch('1');
        mockAxios.reset();
        return expect(staffModel.name).toEqual('NAME');
    });
});
