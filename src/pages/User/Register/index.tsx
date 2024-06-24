import Footer from '@/components/Footer';
import { sendEmailUsingPost, userRegisterUsingPost } from '@/services/backend/userController';
import { CiOutlined, LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Helmet, history } from '@umijs/max';
import { Button, Col, message, Row, Tabs } from 'antd';
import React, { useState } from 'react';
import { Link } from 'umi';
import Settings from '../../../../config/defaultSettings';

/**
 * 用户注册页面
 * @constructor
 */
const UserRegisterPage: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });
  const [userEmail, setEmail] = useState('');
  const [code, setCode] = useState('');
  /**
   * 提交注册
   * @param values
   */
  const handleSubmit = async (values: API.UserRegisterRequest) => {
    // 前端校验
    // 1. 判断密码是否一致
    const { userPassword, checkPassword } = values;
    if (userPassword !== checkPassword) {
      message.error('二次输入的密码不一致');
      return;
    }

    try {
      // 注册
      await userRegisterUsingPost({
        ...values,
      });

      const defaultLoginSuccessMessage = '注册成功！';
      message.success(defaultLoginSuccessMessage);
      history.push('/user/login');
      return;
    } catch (error: any) {
      const defaultLoginFailureMessage = `注册失败，${error.message}`;
      message.error(defaultLoginFailureMessage);
    }
  };
  /**
   * 发送验证码
   */
  const sendVerificationCode = async () => {
    // 使用validator库验证邮箱格式
    if (!userEmail) {
      message.error('请输入邮箱！');
      return;
    }
    try {
      // 注册
      await sendEmailUsingPost({
        userEmail,
        code,
      });
      const defaultSendEmailSuccessMessage = '发送验证码成功！';
      message.success(defaultSendEmailSuccessMessage);
    } catch (error: any) {
      const defaultSendEmailFailureMessage = `发送验证码失败，${error.message}`;
      message.error(defaultSendEmailFailureMessage);
    }
  };
  // @ts-ignore
  // @ts-ignore
  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {'注册'}- {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" style={{ height: '100%' }} src="/logo.svg" />}
          title="ShareSwing - 注册"
          initialValues={{
            autoLogin: true,
          }}
          submitter={{
            searchConfig: {
              submitText: '注册',
            },
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.UserLoginRequest);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '新用户注册',
              },
            ]}
          />
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'请输入账号'}
                rules={[
                  {
                    required: true,
                    message: '账号是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请再次确认密码'}
                rules={[
                  {
                    required: true,
                    message: '确认密码是必填项！',
                  },
                ]}
              />
              <ProFormText
                name="userEmail"
                fieldProps={{
                  size: 'large',
                  prefix: <MailOutlined />,
                  onChange: (e) => setEmail(e.target.value),
                }}
                placeholder={'请输入邮箱'}
                rules={[
                  {
                    required: true,
                    message: '邮箱是必填项！',
                  },
                ]}
              />
              <Row gutter={8}>
                {' '}
                {/* 使用Row来组织验证码输入框和按钮，gutter设置列间距 */}
                <Col span={16}>
                  {' '}
                  {/* 使用Col来控制宽度，span为栅格数 */}
                  <ProFormText
                    name="code"
                    fieldProps={{
                      size: 'large',
                      onChange: (e) => setCode(e.target.value),
                    }}
                    placeholder="输入验证码"
                    rules={[
                      {
                        required: true,
                        message: '验证码是必填项！',
                      },
                    ]}
                  />
                </Col>
                <Col span={8}>
                  <Button type="primary" size="middle" onClick={sendVerificationCode}>
                    发送验证码
                  </Button>
                </Col>
              </Row>
              <ProFormText
                name="codingId"
                fieldProps={{
                  size: 'large',
                  prefix: <CiOutlined />,
                }}
                placeholder={'请输入编号（选填）'}
              />
            </>
          )}

          <div
            style={{
              marginBottom: 24,
              textAlign: 'right',
            }}
          >
            <Link to="/user/login">老用户登录</Link>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default UserRegisterPage;
