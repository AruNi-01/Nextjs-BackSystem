'use client';
import { useTableParamsStore } from '@/state_stores/UserTableCompStore';
import Search from 'antd/es/input/Search';
import { create } from 'zustand';

interface ISearchLoadingState {
  isSearchLoading: boolean;
  setSearchLoading: (flag: boolean) => void;
}
export const useSearchLoadingStore = create<ISearchLoadingState>((set) => ({
  isSearchLoading: false,
  setSearchLoading: (flag: boolean) => set({ isSearchLoading: flag }),
}));

export default function SearchInput() {
  const { isSearchLoading } = useSearchLoadingStore((state) => ({
    isSearchLoading: state.isSearchLoading,
  }));
  const { tableParams, setTableParams } = useTableParamsStore((state) => ({
    tableParams: state.tableParams,
    setTableParams: state.setTableParams,
  }));

  return (
    <>
      <Search
        className="w-1/4 rounded"
        addonBefore="Name"
        placeholder="Search..."
        onSearch={(value, _e, _) => {
          setTableParams({
            ...tableParams,
            searchUsername: value,
          });
        }}
        enterButton
        allowClear
        loading={isSearchLoading}
      />
    </>
  );
}
