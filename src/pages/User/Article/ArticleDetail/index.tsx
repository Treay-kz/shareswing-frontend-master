import { PageContainer } from '@ant-design/pro-components';
import { useState, useEffect, useCallback } from 'react';
import { getArticleVoByIdUsingGet } from '@/services/backend/articleController';
import { Spin } from 'antd';

/**
 * 文章详情页面
 * @constructor */
const ArticleDetailPage: React.FC = () => {
  const [article, setArticle] = useState<API.ArticleVO | null>(null);
  const [loading, setLoading] = useState(true);

  const id = Number(window.location.pathname.split('/').pop());

  const fetchArticleDetail = useCallback(async () => {
    setLoading(true);
    try {
      const { data, code } = await getArticleVoByIdUsingGet({ id });
      if (code === 0 && data) {
        setArticle(data);
      }
    } catch (error) {
      console.error('Failed to fetch article detail:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchArticleDetail();
  }, [fetchArticleDetail]);

  return (
    <PageContainer>
      <Spin spinning={loading}>
        <div>
          <h2>{article ? article.title : 'Loading...'}</h2>
          <div>{article ? article.content : ''}</div>
          <div>
            <span>点赞数: {article ? article.thumbNum : 0}</span>
            <span>收藏数: {article ? article.favourNum : 0}</span>
          </div>
        </div>
      </Spin>
    </PageContainer>
  );
};

export default ArticleDetailPage;
