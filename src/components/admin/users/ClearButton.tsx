'use client';
import { Button } from 'antd';
import { ClearOutlined } from '@ant-design/icons';
import { create } from 'zustand';
import {
  useFilteredInfoStore,
  useSortedInfoStore,
  useTableParamsStore,
} from '@/state_stores/UserTableCompStore';

interface IClearLoadingState {
  clearLoading: boolean;
  setClearLoading: (flag: boolean) => void;
}
export const useClearLoadingStore = create<IClearLoadingState>((set) => ({
  clearLoading: false,
  setClearLoading: (flag: boolean) => set({ clearLoading: flag }),
}));

export default function ClearButton() {
  const { clearLoading, setClearLoading } = useClearLoadingStore((state) => ({
    clearLoading: state.clearLoading,
    setClearLoading: state.setClearLoading,
  }));
  const { tableParams, setTableParams } = useTableParamsStore((state) => ({
    tableParams: state.tableParams,
    setTableParams: state.setTableParams,
  }));
  const { setFilteredInfo } = useFilteredInfoStore((state) => ({
    setFilteredInfo: state.setFilteredInfo,
  }));
  const { setSortedInfo } = useSortedInfoStore((state) => ({
    setSortedInfo: state.setSortedInfo,
  }));

  const handleClick = () => {
    setClearLoading(true);
    setFilteredInfo({});
    setSortedInfo({});
    // 同时也要清空 tableParams 中的，重新调用后端接口
    setTableParams({
      ...tableParams,
      filters: {},
      sortField: undefined,
      sortOrder: undefined,
    });
  };

  return (
    <>
      <Button
        className="float-right"
        type="dashed"
        icon={<ClearOutlined />}
        loading={clearLoading}
        onClick={handleClick}
      >
        <span className="">Clear Filt & Sort</span>
      </Button>
    </>
  );
}
