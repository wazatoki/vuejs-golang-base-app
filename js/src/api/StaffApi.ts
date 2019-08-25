import StaffType from '@/components/models/StaffInterface';
import { BASE_URL, CLIENT } from '@/utils/ajaxUtils';

export default class StaffApi {

    public static API_BASE = '/staff';

    public static create = async (data: StaffType): Promise<any> => {

        const res = await CLIENT
            .post<StaffType>(BASE_URL + StaffApi.API_BASE + '/create', data);

        return res.data;
    }

    public static update = async (data: StaffType): Promise<any> => {

        const res = await CLIENT
            .put<boolean>(BASE_URL + StaffApi.API_BASE + '/update', data);

        return res.data;
    }

    public static read = async (id: string): Promise<any> => {

        const res = await CLIENT
            .get<StaffType>(BASE_URL + StaffApi.API_BASE + '/' + id);

        return res.data;
    }

    public static delete = async (idList: string[]): Promise<boolean> => {

        const res = await CLIENT
            .delete<boolean>(BASE_URL + StaffApi.API_BASE + '/delete', { data: idList });

        return res.data;
    }

    public static search = async (searchStrings: string): Promise<StaffType[]> => {

        const res = await CLIENT
            .get<StaffType[]>(BASE_URL + StaffApi.API_BASE + '/search', { params: searchStrings });

        return res.data;
    }
}
