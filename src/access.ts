/**
 * 处理用户访问权限的逻辑
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.LoginUserVO } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    canUser: currentUser,
    canAdmin: currentUser,
    // canAdmin: currentUser && currentUser.userRole === 'admin',
  };
}
