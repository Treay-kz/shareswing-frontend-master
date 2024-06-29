import {type ActionType, PageContainer, type ProColumns} from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import {theme, Button} from 'antd';
import React, {useRef, useState} from 'react';
import { history } from "@@/core/history";
import UpdateModal from "@/pages/Admin/User/components/UpdateModal";

const UserCenter: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState?? {};

  const user: API.User = {
    id: currentUser.id,
    userAccount: currentUser.userAccount,
    codingId: currentUser.codingId,
    userName: currentUser.userName,
    userAvatar: currentUser.userAvatar,
    userProfile: currentUser.userProfile,
    phone: currentUser.phone,
    email: currentUser.email,
  };
  const columns: ProColumns<API.User>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      valueType: 'text',
    },
    {
      title: '头像',
      dataIndex: 'userAvatar',
      valueType: 'image',
      fieldProps: {
        width: 64,
      },
    },
    {
      title: '简介',
      dataIndex: 'userProfile',
      valueType: 'textarea',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      valueType: 'text',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      valueType: 'text',
    },
 ];
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  return (
    <PageContainer>
      <div
        style={{
          backgroundPosition: '100% -30%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '274px auto',
          backgroundImage:
            "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <img
            src={user.userAvatar}
            alt="UserAvatar"
            style={{ width: '120px', height: '120px', borderRadius: '50%' }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div>
              <span style={{ fontSize: '16px', color: token.colorText }}>账号：</span>
              <span style={{ fontSize: '14px', color: token.colorTextSecondary }}>{user.userAccount}</span>

            </div>
            <div>
              <span style={{ fontSize: '16px', color: token.colorText }}>内部编号（学号）：</span>
                <span style={{ fontSize: '14px', color: token.colorTextSecondary }}>{user.codingId}</span>
            </div>
            <div>
              <span style={{ fontSize: '16px', color: token.colorText }}>用户昵称：</span>
                <span style={{ fontSize: '14px', color: token.colorTextSecondary }}>{user.userName}</span>
            </div>
            <div>
              <span style={{ fontSize: '16px', color: token.colorText }}>用户简介：</span>
                <span style={{ fontSize: '14px', color: token.colorTextSecondary }}>{user.userProfile}</span>
            </div>
            <div>
              <span style={{ fontSize: '16px', color: token.colorText }}>手机号码：</span>
                <span style={{ fontSize: '14px', color: token.colorTextSecondary }}>{user.phone}</span>
            </div>
            <div>
              <span style={{ fontSize: '16px', color: token.colorText }}>邮箱：</span>

                <span style={{ fontSize: '14px', color: token.colorTextSecondary }}>{user.email}</span>
            </div>
          </div>
        </div>
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setUpdateModalVisible(true);
            }}
          > 修改</Button>
      </div>

      <UpdateModal
        visible={updateModalVisible}
        columns={columns}
        oldData={user}
        onSubmit={() => {
          setUpdateModalVisible(false);
          actionRef.current?.reload();
        }}
        onCancel={() => {
          setUpdateModalVisible(false);
        }}
      />
    </PageContainer>
  );
};

export default UserCenter;
