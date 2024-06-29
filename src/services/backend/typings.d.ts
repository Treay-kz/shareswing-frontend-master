declare namespace API {
  type Article = {
    articleStatus?: number;
    content?: string;
    createTime?: string;
    favourNum?: number;
    id?: number;
    isDelete?: number;
    tags?: string;
    thumbNum?: number;
    title?: string;
    updateTime?: string;
    userId?: number;
  };

  type ArticleAddRequest = {
    content?: string;
    tags?: string;
    title?: string;
  };

  type ArticleQueryRequest = {
    articleStatus?: number;
    content?: string;
    createTime?: string;
    current?: number;
    favourNum?: number;
    id?: number;
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    tags?: string;
    thumbNum?: number;
    title?: string;
    updateTime?: string;
    userId?: number;
  };

  type ArticleReviewRequest = {
    id?: number;
    isPass?: boolean;
    reviewDescription?: string;
    reviewMessage?: string;
  };

  type ArticleUpdateRequest = {
    content?: string;
    id?: number;
    tags?: string[];
    title?: string;
  };

  type ArticleVO = {
    content?: string;
    createTime?: string;
    favourNum?: number;
    hasFavour?: boolean;
    hasThumb?: boolean;
    id?: number;
    tagList?: string[];
    thumbNum?: number;
    title?: string;
    updateTime?: string;
    user?: UserVO;
    userId?: number;
  };

  type BaseResponseArticleVO_ = {
    code?: number;
    data?: ArticleVO;
    message?: string;
  };

  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseFileVO_ = {
    code?: number;
    data?: FileVO;
    message?: string;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponsePageArticle_ = {
    code?: number;
    data?: PageArticle_;
    message?: string;
  };

  type BaseResponsePageArticleVO_ = {
    code?: number;
    data?: PageArticleVO_;
    message?: string;
  };

  type BaseResponsePageFile_ = {
    code?: number;
    data?: PageFile_;
    message?: string;
  };

  type BaseResponsePageFileVO_ = {
    code?: number;
    data?: PageFileVO_;
    message?: string;
  };

  type BaseResponsePageTag_ = {
    code?: number;
    data?: PageTag_;
    message?: string;
  };

  type BaseResponsePageUser_ = {
    code?: number;
    data?: PageUser_;
    message?: string;
  };

  type BaseResponseString_ = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseTag_ = {
    code?: number;
    data?: Tag;
    message?: string;
  };

  type BaseResponseUser_ = {
    code?: number;
    data?: User;
    message?: string;
  };

  type BaseResponseUserVO_ = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type DeleteRequest = {
    id?: number;
  };

  type downUsingGETParams = {
    /** fileUUID */
    fileUUID: string;
  };

  type File = {
    createTime?: string;
    fileName?: string;
    fileSize?: number;
    fileStatus?: number;
    fileType?: string;
    fileUrl?: string;
    id?: number;
    isDelete?: number;
    md5?: string;
    updateTime?: string;
    userId?: number;
  };

  type FileQueryRequest = {
    createTime?: string;
    current?: number;
    fileName?: string;
    fileSize?: number;
    fileStatus?: number;
    fileType?: string;
    fileUrl?: string;
    id?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    updateTime?: string;
    userId?: number;
  };

  type FileVO = {
    fileName?: string;
    fileUrl?: string;
    id?: number;
    user?: UserVO;
    userId?: number;
  };

  type getArticleVOByIdUsingGETParams = {
    /** id */
    id: number;
  };

  type getFileVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageArticle_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Article[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageArticleVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: ArticleVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageFile_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: File[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageFileVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: FileVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageTag_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Tag[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUser_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: User[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type searchTagUsingPOSTParams = {
    /** id */
    id?: number;
  };

  type Tag = {
    createTime?: string;
    id?: number;
    isDelete?: number;
    isParent?: number;
    parentId?: number;
    tagName?: string;
    updateTime?: string;
  };

  type TagQueryRequest = {
    createTime?: string;
    current?: number;
    id?: number;
    isParent?: number;
    pageSize?: number;
    parentId?: number;
    sortField?: string;
    sortOrder?: string;
    tagName?: string;
    updateTime?: string;
  };

  type User = {
    codingId?: string;
    createTime?: string;
    email?: string;
    id?: number;
    isDelete?: number;
    phone?: string;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPassword?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserAddRequest = {
    codingId?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserBanRequest = {
    banStatus?: boolean;
    id?: number;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserQueryRequest = {
    current?: number;
    id?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    userAccount?: string;
    userName?: string;
  };

  type UserRegisterRequest = {
    checkPassword?: string;
    code?: string;
    codingId?: string;
    userAccount?: string;
    userEmail?: string;
    userPassword?: string;
  };

  type UserSendEmail = {
    code?: string;
    userEmail?: string;
  };

  type UserUpdatePasswordRequest = {
    code?: string;
    email?: string;
    id?: number;
    userAccount?: string;
    userPassword?: string;
  };

  type UserUpdateRequest = {
    email?: string;
    id?: number;
    phone?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserVO = {
    codingId?: string;
    email?: string;
    id?: number;
    phone?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };
}
