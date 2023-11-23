import { UserDataType } from "@/app/admin/users/page";
import { TablePaginationConfig } from "antd";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { create } from "zustand";

// 数据表格的筛选参数
interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
  searchUsername?: string;
}

interface ITableParamsState {
  tableParams: TableParams;
  setTableParams: (params: TableParams) => void;
}
export const useTableParamsStore = create<ITableParamsState>((set) => ({
  tableParams: {
    pagination: {
      current: 1,
      pageSize: 10,
    },
  },
  setTableParams: (params: TableParams) => set({ tableParams: params }),
}));

interface ITableChangeLoadingState {
  tableChangeLoading: boolean;
  setTableChangeLoading: (flag: boolean) => void;
}
export const useTableChangeLoadingStore = create<ITableChangeLoadingState>(
  (set) => ({
    tableChangeLoading: false,
    setTableChangeLoading: (flag: boolean) => set({ tableChangeLoading: flag }),
  })
);

interface IFilteredInfoState {
  filteredInfo: Record<string, FilterValue | null>;
  setFilteredInfo: (obj: Record<string, FilterValue | null>) => void;
}
export const useFilteredInfoStore = create<IFilteredInfoState>((set) => ({
  filteredInfo: {},
  setFilteredInfo: (obj: Record<string, FilterValue | null>) =>
    set({ filteredInfo: obj }),
}));

interface ISortedInfoState {
  sortedInfo: SorterResult<UserDataType>;
  setSortedInfo: (obj: SorterResult<UserDataType>) => void;
}
export const useSortedInfoStore = create<ISortedInfoState>((set) => ({
  sortedInfo: {},
  setSortedInfo: (obj: SorterResult<UserDataType>) => set({ sortedInfo: obj }),
}));
