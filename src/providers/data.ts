import {BaseRecord, DataProvider, GetListParams, GetListResponse} from "@refinedev/core";
import {MOCK_ITEMS} from "../constants/mock-data";

export const dataProvider: DataProvider = {
  getList: async <TData extends BaseRecord = BaseRecord>({ resource }: GetListParams): Promise<GetListResponse<TData>> => {
    if(resource !== 'items') return { data: [] as TData[], total: 0 };

    return {
      data: MOCK_ITEMS as unknown as TData[],
      total: MOCK_ITEMS.length,
    }
  },

  getOne: async () => {throw new Error('This function is not present in mock')},
  create: async () => {throw new Error('This function is not present in mock')},
  update: async () => {throw new Error('This function is not present in mock')},
  deleteOne: async () => {throw new Error('This function is not present in mock')},

  getApiUrl: () => '',
}