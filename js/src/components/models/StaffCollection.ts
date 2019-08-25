import { Component, Vue } from 'vue-property-decorator';
import Ajax from '../utils/Ajax';
import StaffType from './StaffInterface';

@Component({})
export default class StaffCollection extends Vue {

    private data: StaffType[] = [];

    get staffList(): StaffType[] {
        return this.data;
    }

    private readonly ajax = new Ajax();

    get ajaxClient() {// for test

        return this.ajax.client;
    }

    get ajaxBaseUrl() {// for test

        return this.ajax.baseUrl;
    }

    public async fetch(searchWd: string): Promise<any> {

        const res = await this.ajax.client.get<StaffType[]>('/search', {
            params: { searchStrings: searchWd },
        });
        this.data.splice(0, this.data.length);
        res.data.forEach((element: StaffType) => {
            this.data.push(element);
        });
    }

    public async delete(idList: string[]): Promise<any> {

        const res = await this.ajax.client.delete<boolean>('/delete', { data: idList });
        return res.data;
    }

    public reset(): void {
        this.data = [];
    }
}
