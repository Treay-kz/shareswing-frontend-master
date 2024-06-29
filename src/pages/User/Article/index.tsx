import {ActionType, ProColumns, ProFormText} from '@ant-design/pro-components';
import {PageContainer} from '@ant-design/pro-components';
import {history} from '@umijs/max';
import React, {useEffect, useRef, useState} from 'react';
import {listArticleVoByPageUsingPost} from "@/services/backend/articleController";
import {Button, Space} from "antd";
import {FormOutlined, LikeOutlined, LikeFilled, StarOutlined, StarFilled} from "@ant-design/icons";
import moment from 'moment';
import CreateModal from "@/pages/Admin/Audit/components/ArticleCreateModal";

/**
 * 文章页面
 *
 * @constructor
 */
const ArticlePage: React.FC = () => {
  // 当前用户点击的数据
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);

  const [articles, setArticles] = useState<API.ArticleVO[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  const actionRef = useRef<ActionType>();

  useEffect(() => {
    const fetchArticles = async () => {
      const {data, code} = await listArticleVoByPageUsingPost({});
      if (code === 0 && data?.records) {
        setArticles(data.records || []);
      }
    };

    fetchArticles();
  }, []);

  const handleArticleSearch = async () => {
    const {data, code} = await listArticleVoByPageUsingPost({
      searchText: searchText,
    })
    if (code === 0 && data?.records) {
      setArticles(data.records || []);
    }
    // 重新刷新页面
    actionRef?.current?.reload();
    // window.location.reload();
  }

  const handleLikeClick = (article: API.ArticleVO) => {
    const updatedArticles = articles.map((item) => {
      if (item.id === article.id) {
        if (!item.thumbNum) {
          return {...item, thumbNum: 1,hasThumb: true};
        }
        if (item.hasThumb) {
          return {...item, thumbNum: item.thumbNum - 1, hasThumb: false};
        } else {
          return {...item, thumbNum: item.thumbNum + 1, hasThumb: true};
        }
      }
      return item;
    });
    setArticles(updatedArticles);
    // 在这里可以添加实际的点赞请求逻辑
    console.log(`点赞了文章: ${updatedArticles}`);
  };

  const handleCollectClick = (article: API.Article) => {
    const updatedArticles = articles.map((item) => {
      if (item.id === article.id) {
        if (!item.favourNum) {
          return {...item, favourNum: 1,hasFavour: true};
        }
        if (item.hasFavour) {
          return {...item, favourNum: item.favourNum - 1, hasFavour: false};
        } else {
          return {...item, favourNum: item.favourNum + 1, hasFavour: true};
        }
      }
      return item;
    });
    setArticles(updatedArticles);
    // 在这里可以添加实际的收藏请求逻辑
    console.log(`收藏了文章: ${updatedArticles}`);
  };

  // 处理点击标题或内容跳转的函数
  const handleArticleClick = (id: any) => {
    // window.location.href = `/user/article/articleDetail/${articleId}`;
    history.push(`/user/article/articleDetail/${id}`);
    return;
  }

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
      hideInSearch: true,
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
    }
  ];

  return (
    <PageContainer
      fixedHeader
      tabList={[
        {
          tab: '推荐',
          key: '1',
        },
        {
          tab: '热门',
          key: '2',
        },
        {
          tab: '最新',
          key: '3',
        },

      ]}>
      <div style={{display: 'flex', width: '100%'}}>
        <ProFormText
          fieldProps={{
            onChange: (e) => setSearchText(e.target.value),
          }}
          placeholder={'请输入关键词'}
        />
        <Button
          type="primary"
          style={{marginLeft: '10px'}}
          onClick={handleArticleSearch}
        >搜索</Button>
        <Button
          type="primary"

          style={{marginLeft: '10px'}}
          onClick={() => {
            setCreateModalVisible(true);
          }}
        >
          <FormOutlined/> 发布文章
        </Button>
      </div>
      {articles.map((article, index) => (
        <div key={index} style={{padding: '16px', borderBottom: '1px solid #e8e8e8', position: 'relative'}}>
          <h3 style={{fontSize: '20px', fontWeight: 'bold'}}
              onClick={() => handleArticleClick(article.id)}>{article.title}</h3>
          <p style={{fontSize: '14px'}}
             onClick={() => handleArticleClick(article.id)}>{article.content ? article.content.slice(0, 100) + '...' : '暂无内容'}</p>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'pace-between', width: '100%'}}>
            <div style={{
              fontSize: '12px',
              color: '#888'
            }}>发布时间：{moment(article.createTime).format('YYYY-MM-DD HH:mm:ss')}</div>

            <Space size="middle">
              <span style={{cursor: 'pointer', marginLeft: '10px'}} onClick={() => handleLikeClick(article)}>
                {article.hasThumb ? <LikeFilled style={{fontSize: '16px'}}/> :
                  <LikeOutlined style={{fontSize: '16px'}}/>} {article.thumbNum}
              </span>
              <span style={{cursor: 'pointer'}} onClick={() => handleCollectClick(article)}>
                {article.hasFavour ? <StarFilled style={{fontSize: '16px'}}/> :
                  <StarOutlined style={{fontSize: '16px'}}/>} {article.favourNum}
              </span>
            </Space>
          </div>
        </div>
      ))}
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
    </PageContainer>
  );
};

export default ArticlePage;
