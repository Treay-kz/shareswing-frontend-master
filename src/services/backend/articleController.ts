// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addArticle POST /api/article/add */
export async function addArticleUsingPost(
  body: API.ArticleAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/article/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** reviewArticle POST /api/article/admin/review/article */
export async function reviewArticleUsingPost(
  body: API.ArticleReviewRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/article/admin/review/article', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteArticle POST /api/article/delete */
export async function deleteArticleUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/article/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getArticleVOById GET /api/article/get/vo */
export async function getArticleVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getArticleVOByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseArticleVO_>('/api/article/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listArticleByPage POST /api/article/list/page */
export async function listArticleByPageUsingPost(
  body: API.ArticleQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageArticle_>('/api/article/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateArticle POST /api/article/update */
export async function updateArticleUsingPost(
  body: API.ArticleUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/article/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
