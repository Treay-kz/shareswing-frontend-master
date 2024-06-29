import { ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { message, Modal } from 'antd';
import React from 'react';
import {reviewFileUsingPost} from "@/services/backend/fileController";

interface Props {
  oldData?: API.Article;
  visible: boolean;
  columns: ProColumns<API.ArticleReviewRequest>[];
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
    await reviewFileUsingPost(fields);
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
const FileReviewModal: React.FC<Props> = (props) => {
  const { oldData, visible, onSubmit, onCancel } = props;

  if (!oldData) {
    return <></>;
  }
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
        onSubmit={async (values: API.Article) => {
          const success = await handleUpdate({
            ...values,
            id: oldData.id as any,
          });
          if (success) {
            onSubmit?.(values);
          }
        }}
      />
    </Modal>
  );
};
export default FileReviewModal;
