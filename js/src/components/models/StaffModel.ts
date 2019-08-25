import { Component, Vue } from 'vue-property-decorator';
import Ajax from '../utils/Ajax';
import StaffType from './StaffInterface';

@Component({})
export default class StaffModel extends Vue {

    public id: string = '';
    public staffId: string = '';
    public name: string = '';
    public password: string = '';

    get ajaxClient() {// for test
        return this.ajax.client;
    }

    get ajaxBaseUrl() {// for test
        return this.ajax.baseUrl;
    }

    get fields(): StaffType {
        return { id: this.id, staffId: this.staffId, name: this.name, password: this.password };
    }

    set fields(data: StaffType) {
        this.id = data.id;
        this.staffId = data.staffId;
        this.name = data.name;
        this.password = data.password;

    }

    private readonly ajax = new Ajax();

    public async save(): Promise<boolean> {

        if (this.id === '' || this.id === null) {

            const resPost = await this.ajax.client.post<string>(
                '/create', { staffId:this.staffId, name: this.name, password: this.password });
            this.id = resPost.data;
            return true;
        } else {

            const resPut = await this.ajax.client.put<boolean>(
                '/update', { id: this.id, staffId: this.staffId, name: this.name, password: this.password });
            if (!resPut) {
                return false;
            }
            return true;
        }
    }

    public async fetch(id: string): Promise<any> {
        const ajax = new Ajax();

        const res = await this.ajax.client.get<StaffType>(this.ajax.baseUrl + '/' + id);
        this.id = res.data.id;
        this.staffId = res.data.staffId;
        this.name = res.data.name;
        this.password = res.data.password;
    }

    public clear(): void {
        this.id = '';
        this.staffId = '';
        this.name = '';
        this.password = '';
    }

    public reset(): void {
        this.staffId = '';
        this.name = '';
        this.password = '';
    }
}
