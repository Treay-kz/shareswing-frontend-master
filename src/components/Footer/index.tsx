
import { DefaultFooter } from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';

const Footer: React.FC = () => {
  const defaultMessage = 'ShareSwing';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[{
        key: 'welcome',
        title: '为知识插上翅膀',
        href: 'http://localhost:8000/welcome',
        blankTarget: true,
      }
      ]}
    />
  );
};
export default Footer;
