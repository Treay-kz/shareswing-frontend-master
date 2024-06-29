export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
    ],
  },
  { path: '/welcome', icon: 'home', component: './Welcome', name: '主页' },
  {
    path: '/user/article',
    icon: 'read',
    component: './User/Article',
    name: '文章',
    routes: [
      { path: '/user/article/articleDetail/:id',
        component: './User/Article/ArticleDetail',
        layout: false,
      name:'文章详情'},
    ]
  },
  { path: '/user/file', icon: 'folderOpen', component: './User/File', name: '文件' },
  { path: '/user/userCenter', access: 'canUser', icon: 'user', component: './User/UserCenter', name: '个人中心' },
  {
    path: '/admin',
    icon: 'crown',
    name: '管理页',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/user' },
      { icon: 'table', path: '/admin/user', component: './Admin/User' +
          '', name: '用户管理' },
      {
        icon: 'table',
        path: '/admin/review',
        name: '审核管理',
        routes: [
          { path: '/admin/review/article', component: './Admin/Audit/Article', name: '文章审核' },
          {  path: '/admin/review/file', component: './Admin/Audit/File', name: '文件审核' },
        ]
      },
      {  path: '/admin/tags', component: './Admin/Tags', name: '标签管理' },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
