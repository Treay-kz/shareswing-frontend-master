export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
    ],
  },
  { path: '/welcome', icon: 'smile', component: './Welcome', name: '欢迎页' },
  {
    path: '/admin',
    icon: 'crown',
    name: '管理页',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/user' },
      { icon: 'table', path: '/admin/user', component: './Admin/User', name: '用户管理' },
      {
        icon: 'table',
        path: '/admin/review',
        name: '审核管理',
        routes: [
          { path: '/admin/review/article', component: './Admin/User', name: '文章审核' },
          {  path: '/admin/review/file', component: './Admin/User', name: '文件审核' },
        ]
      },
      {  path: '/admin/tags', component: './Admin/Tags', name: '标签管理' },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
