import {PageContainer} from '@ant-design/pro-components';
import {useState, useEffect} from 'react';
import {getArticleVoByIdUsingGet} from "@/services/backend/articleController";
import {Spin} from 'antd';


/**

 文章详情页面
 @constructor */ const ArticleDetailPage: React.FC = () => {
  const [articleDetail, setArticleDetail] = useState<API.ArticleVO>();
  const [loading, setLoading] = useState(true);
// 从 URL 中获取文章 ID
  const id = Number(window.location.pathname.split('/').pop());

  useEffect(() => {
    const fetchArticleDetail = async () => {
      const {data, code} = await getArticleVoByIdUsingGet({id});
      if (code === 0 && data) {
        setArticleDetail(data);
      }
      setLoading(false); // 修改此处，在获取到数据后设置加载状态为 false
    };

    fetchArticleDetail();
  }, [id]);

  return (
    <PageContainer>
      {loading ? (
        <Spin size="large"/>
      ) : (
        <div>
          <h2>{articleDetail ? articleDetail.title : null}</h2>
          <div>{articleDetail.content}</div>
          <div>
            <span>点赞数: {articleDetail.thumbNum}</span>
            <span>收藏数: {articleDetail.favourNum}</span>
          </div>
        </div>
      )}
    </PageContainer>
  );
};

export default ArticleDetailPage;
