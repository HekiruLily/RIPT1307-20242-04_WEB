import { adminChangePassword, getUser, putUser } from '@/services/User/user';
import { message } from 'antd';
import { useState } from 'react';

export default () => {
  const [danhSach, setDanhSach] = useState<Login.Profile[]>([]);
  const [filterInfo, setFilterInfo] = useState<any>({});
  const [condition, setCondition] = useState<any>({ vai_tro: 'sinh_vien' });
  const [record, setRecord] = useState<Login.Profile>({} as Login.Profile);
  const [loading, setLoading] = useState<boolean>(true);
  const [edit, setEdit] = useState<boolean>(false);
  const [visibleForm, setVisibleForm] = useState<boolean>(false);
  const [visibleFormCapLaiMatKhau, setVisibleFormCapLaiMatKhau] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const getUserModel = async () => {
    setLoading(true);
    const response = await getUser({ page, limit, condition });
    setDanhSach(response?.data?.data?.result ?? []);
    setTotal(response?.data?.data?.total ?? 0);
    setLoading(false);
  };

  const adminChangePasswordModel = async (payload: { user_id?: number; password: string }) => {
    if (!payload?.user_id) return;
    setLoading(true);
    await adminChangePassword(payload);
    message.success('Cấp lại mật khẩu thành công');
    setVisibleFormCapLaiMatKhau(false);
    setLoading(false);
  };

  const adminPutProfileUserModel = async (payload: Login.Profile & { user_id: number }) => {
    if (!payload.user_id) return;
    setLoading(true);
    await putUser(payload);
    message.success('Sửa thành công');
    setLoading(false);
    getUserModel();
    setVisibleForm(false);
  };

  return {
    visibleFormCapLaiMatKhau,
    setVisibleFormCapLaiMatKhau,
    adminPutProfileUserModel,
    adminChangePasswordModel,
    getUserModel,
    danhSach,
    setDanhSach,
    filterInfo,
    setFilterInfo,
    condition,
    setCondition,
    record,
    setRecord,
    loading,
    setLoading,
    edit,
    setEdit,
    visibleForm,
    setVisibleForm,
    total,
    setTotal,
    page,
    setPage,
    limit,
    setLimit,
  };
};
