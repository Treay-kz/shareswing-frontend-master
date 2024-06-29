import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import {Button, message, Space, Typography} from 'antd';
import React, { useRef, useState } from 'react';
import {deleteArticleUsingPost, listArticleByPageUsingPost} from "@/services/backend/articleController";
import ArticleReviewModal from "@/pages/Admin/Audit/components/ArticleReviewModal";
import CreateModal from "@/pages/Admin/Audit/components/ArticleCreateModal";
import {PlusOutlined} from "@ant-design/icons";

/**
 * 文章审核页面
 *
 * @constructor
 */
const ArticleAdminPage: React.FC = () => {
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);

  // 是否显示审核窗口
  const [ArticleReviewModalVisible, setArticleReviewModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  // 当前用户点击的数据
  const [currentRow, setCurrentRow] = useState<API.Article>();

  /**
   * 删除节点
   *
   * @param row
   */
  const handleDelete = async (row: API.Article) => {
    const hide = message.loading('正在删除');
    if (!row) return true;
    try {
      await deleteArticleUsingPost({
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
  const columns: ProColumns<API.Article>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
    },
    {
      title: '标题',
      dataIndex: 'title',
      valueType: 'text',
    },
    {
      title: '内容',
      dataIndex: 'content',
      valueType: 'textarea',
      render: (text) => <div style={{ width: '300px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>{text}</div>
    },
    {
      title: '标签',
      dataIndex: 'tags',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '点赞数',
      dataIndex: 'favourNum',
      valueType: 'text',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '收藏数',
      dataIndex: 'thumbNum',
      valueType: 'text',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '文章状态',
      dataIndex: 'articleStatus',
      valueType: 'text',
      hideInForm: true,
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
              setArticleReviewModalVisible(true);
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
      <ProTable<API.Article>
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
            <PlusOutlined /> 发布文章
          </Button>,
        ]}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;

          const { data, code } = await listArticleByPageUsingPost({
            ...params,
            sortField,
            sortOrder,
            ...filter,
          } as API.ArticleQueryRequest);

          return {
            success: code === 0,
            data: data?.records || [],
            total: Number(data?.total) || 0,
          };
        }}
        columns={columns}
      />
      <CreateModal
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
      <ArticleReviewModal
        visible={ArticleReviewModalVisible}
        columns={columns}
        oldData={currentRow}
        onSubmit={() => {
          setArticleReviewModalVisible(false);
          setCurrentRow(undefined);
          actionRef.current?.reload();
        }}
        onCancel={() => {
          setArticleReviewModalVisible(false);
        }}
      />

    </PageContainer>
  );
};
export default ArticleAdminPage;
