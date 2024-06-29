import {ProColumns, ProFormUploadButton} from '@ant-design/pro-components';
import '@umijs/max';
import {message, Modal, Button,Space} from 'antd';
import React,{ useState }  from 'react';
import {uploadFileUsingPost} from "@/services/backend/fileController";


interface Props {
  visible: boolean;
  columns: ProColumns<API.File>[];
  onSubmit: (values:API.File) => void;
  onCancel: () => void;
}

interface FileWithRequiredProps extends File {
  webkitRelativePath?: string;
  arrayBuffer?(): Promise<ArrayBuffer>;
  slice?(start: number, end: number, contentType?: string): Blob;
  stream?(): ReadableStream<Uint8Array>;
  text?(): Promise<string>;
}
/**
 * 添加节点
 * @param file
 */
const handleUpload = async (file: File) => {
  const hide = message.loading('正在上传');
  try {
    await uploadFileUsingPost(file);
    hide();
    message.success('上传成功');
    return true;
  } catch (error: any) {
    hide();
    message.error('上传失败，' + error.message);
    return false;
  }
};

/**
 * 上传弹窗
 * @param props
 * @constructor
 */
const UploadModal: React.FC<Props> = (props) => {
  const { visible, onCancel } = props;
  const [fileList, setFileList] = useState<FileWithRequiredProps[]>([]);
  const handleCancel = () => {
    onCancel?.();
  };
  const handleUploadClick = () => {
    if (fileList.length === 0) {
      message.error('请选择文件');
      return;
    }

    const file = fileList[0];
    handleUpload(file);
  };
  return (
    <Modal
      destroyOnClose
      title={'上传'}
      open={visible}
      footer={null}
    >
      <ProFormUploadButton
        extra="支持扩展名：.jpg .zip .doc .pdf(不超过10MB)"
        name="file"
        title="上传文件"
        onChange={(info) => {
          setFileList(info.fileList as FileWithRequiredProps[]);
        }}
      />
      <Space>
        <Button type="primary" onClick={handleUploadClick}>上传</Button>
        <Button onClick={handleCancel}>取消</Button>
      </Space>
    </Modal>
  );
};
export default UploadModal;
