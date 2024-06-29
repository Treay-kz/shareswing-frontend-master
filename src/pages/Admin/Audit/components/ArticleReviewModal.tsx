import { ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { message, Modal } from 'antd';
import React from'react';
import { reviewArticleUsingPost } from "@/services/backend/articleController";

interface Props {
  oldData?: API.ArticleReviewRequest;
  visible: boolean;
  columns: ProColumns<API.Article>[];
  onSubmit: (values: API.ArticleReviewRequest) => void;
  onCancel: () => void;
}

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.ArticleReviewRequest) => {
  const hide = message.loading('正在更新');
  try {
    await reviewArticleUsingPost(fields);
    hide();
    message.success('更新成功');
    return true;
  } catch (error: any) {
    hide();
    message.error('更新失败，' + error.message);
    return false;
  }
};

/**
 * 更新弹窗
 * @param props
 * @constructor
 */
const ArticleReviewModal: React.FC<Props> = (props) => {
  const { oldData, visible, onSubmit, onCancel } = props;

  if (!oldData) {
    return <></>;
  }

  const newColumns = [
    {
      title: '审核结果',
      dataIndex: 'isPass',
      valueType:'select',
      valueEnum: {
        true: {
          text: '通过',
        },
        false: {
          text: '未通过',
        },
      },
    },
    {
      title: '未通过原因',
      dataIndex: 'reviewMessage',
      valueType:'select',
      valueEnum: {
        '内容违规': {
          text: '内容违规',
        },
        '格式错误': {
          text: '格式错误',
        },
        '其他': {
          text: '其他',
        },
      },
    },
    {
      title: '原因描述',
      dataIndex:'reviewDescription',
      valueType: 'textarea',
    }
  ];

  return (
    <Modal
      destroyOnClose
      title={'审核文章'}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <ProTable
        type="form"
        columns={newColumns}
        form={{
          initialValues: oldData,
        }}
        onSubmit={async (values: API.ArticleReviewRequest) => {
          const success = await handleUpdate({
            id: oldData.id as any,
            isPass: values.isPass,
            reviewMessage: values.reviewMessage,
            reviewDescription: values.reviewDescription
          });
          if (success) {
            onSubmit?.(values);
          }
        }}
      />
    </Modal>
  );
};

export default ArticleReviewModal;
