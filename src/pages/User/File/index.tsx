import type { ActionType } from '@ant-design/pro-components';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import '@umijs/max';
import React, {useEffect, useRef, useState} from 'react';
import UploadModal from '@/pages/Admin/Audit/components/UploadModal';
import { listFileVoByPageUsingPost} from "@/services/backend/fileController";
import { Button } from 'antd';
import {PlusOutlined} from "@ant-design/icons";
import {history} from "@@/core/history";

/**
 * 文章审核页面
 *
 * @constructor
 */
const FilePage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  // 当前用户点击的数据
  const [files, setFiles] = useState<API.File[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const { data, code } = await listFileVoByPageUsingPost({});
      if (code === 0) {
        setFiles(data.records || []);
      }
    };

    fetchFiles();
  }, []);

  const handleFileClick = (fileUrl: string) => {
    // window.location.href = `/user/article/articleDetail/${articleId}`;
    window.open(fileUrl);
    return;
  }
  const renderFileCards = (files: API.File[]) => {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'epeat(4, 1fr)', gridGap: '16px' }}>
        {files.map((file, index) => (
          <ProCard key={index} style={{ marginBottom: 16 }} bordered>
            <div onClick={() => handleFileClick(file.fileUrl)}><strong>文件名：</strong>{file.fileName}</div>
          </ProCard>
        ))}
      </div>
    );
  };

  return (
    <PageContainer>
      <Button
        type="primary"
        key="primary"
        onClick={() => {
          setCreateModalVisible(true);
        }}
      >
        <PlusOutlined /> 上传
      </Button>,
      <ProCard gutter={16} style={{ marginBlockStart: 16 }}>
      {renderFileCards(files)}
      </ProCard>
      <UploadModal
        visible={createModalVisible}
        columns={[]}
        onSubmit={() => {
          setCreateModalVisible(false);
          actionRef.current?.reload();
        }}
        onCancel={() => {
          setCreateModalVisible(false);
        }}
      />
    </PageContainer>
  );
};

export default FilePage;
