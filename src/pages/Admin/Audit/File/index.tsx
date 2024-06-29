import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Button, message, Space, Typography } from 'antd';
import React, { useRef, useState } from 'react';
import {deleteFileUsingPost, listFileByPageUsingPost} from "@/services/backend/fileController";
import FileReviewModal from '@/pages/Admin/Audit/components/FileReviewModal';
import UploadModal from '@/pages/Admin/Audit/components/UploadModal';

/**
 * 文章审核页面
 *
 * @constructor
 */
const FileAdminPage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);

  const [FileReviewModalVisible, setFileReviewModalVisible] = useState<boolean>(false);

  // 当前用户点击的数据
  const [currentRow, setCurrentRow] = useState<API.File>();

  /**
   * 删除节点
   *
   * @param row
   */
  const handleDelete = async (row: API.File) => {
    const hide = message.loading('正在删除');
    if (!row) return true;
    try {
      await deleteFileUsingPost({
        id: row.id as any,
      });
      hide();
      message.success('删除成功');
      actionRef?.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('删除失败，' + error.message);
      return false;
    }
  };

  /**
   * 表格列配置
   */
  const columns: ProColumns<API.File>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
    },
    {
      title: '文件名',
      dataIndex: 'fileName',
      valueType: 'text',
    },
    {
      title: '文件类型',
      dataIndex: 'fileType',
      valueType: 'text',
    },
    {
      title: '文件大小',
      dataIndex: 'fileSize',
      valueType: 'text',
    },
    {
      title: '文件路径',
      dataIndex: 'fileUrl',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '文件状态',
      dataIndex: 'fileStatus',
      valueType: 'text',
    },
    {
      title: '上传人',
      dataIndex: 'userId',
      valueType: 'text',
    },
    {
      title: '创建时间',
      sorter: true,
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '更新时间',
      sorter: true,
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Space size="middle">
          <Typography.Link
            onClick={() => {
              setCurrentRow(record);
              setFileReviewModalVisible(true);
            }}
          >
            审核
          </Typography.Link>
          <Typography.Link type="danger" onClick={() => handleDelete(record)}>
            删除
          </Typography.Link>
        </Space>
      ),
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.User>
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setCreateModalVisible(true);
            }}
          >
            <PlusOutlined /> 上传
          </Button>,
        ]}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;

          const { data, code } = await listFileByPageUsingPost({
            ...params,
            sortField,
            sortOrder,
            ...filter,
          } as API.FileQueryRequest);

          return {
            success: code === 0,
            data: data?.records || [],
            total: Number(data?.total) || 0,
          };
        }}
        columns={columns}
      />
      <UploadModal
        visible={createModalVisible}
        columns={columns}
        onSubmit={() => {
          setCreateModalVisible(false);
          actionRef.current?.reload();
        }}
        onCancel={() => {
          setCreateModalVisible(false);
        }}
      />
      <FileReviewModal
        visible={FileReviewModalVisible}
        columns={columns}
        oldData={currentRow}
        onSubmit={() => {
          setFileReviewModalVisible(false);
          setCurrentRow(undefined);
          actionRef.current?.reload();
        }}
        onCancel={() => {
          setFileReviewModalVisible(false);
        }}
      />
    </PageContainer>
  );
};
export default FileAdminPage;
