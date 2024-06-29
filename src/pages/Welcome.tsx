import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Card, theme } from 'antd';
import React from 'react';

/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */
const InfoCard: React.FC<{
  title: string;
  index: number;
  desc: string;
  href: string;
}> = ({ title, href, index, desc }) => {
  const { useToken } = theme;

  const { token } = useToken();

  return (
    <div
      style={{
        backgroundColor: token.colorBgContainer,
        boxShadow: token.boxShadow,
        borderRadius: '8px',
        fontSize: '14px',
        color: token.colorTextSecondary,
        lineHeight: '22px',
        padding: '16px 19px',
        minWidth: '220px',
        flex: 1,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '4px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            lineHeight: '22px',
            backgroundSize: '100%',
            textAlign: 'center',
            padding: '8px 16px 16px 12px',
            color: '#FFF',
            fontWeight: 'bold',
            backgroundImage:
              "url('https://gw.alipayobjects.com/zos/bmw-prod/daaf8d50-8e6d-4251-905d-676a24ddfa12.svg')",
          }}
        >
          {index}
        </div>
        <div
          style={{
            fontSize: '16px',
            color: token.colorText,
            paddingBottom: 8,
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          fontSize: '14px',
          color: token.colorTextSecondary,
          textAlign: 'justify',
          lineHeight: '22px',
          marginBottom: 8,
        }}
      >
        {desc}
      </div>
      <a href={href} target="_blank" rel="noreferrer">
        了解更多 {'>'}
      </a>
    </div>
  );
};

const Welcome: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  // @ts-ignore
  return (
    <PageContainer>
      <Card
        style={{
          borderRadius: 8,
        }}
        bodyStyle={{
          backgroundImage:
            initialState?.settings?.navTheme === 'realDark'
              ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
              : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
        }}
      >
        <div
          style={{
            backgroundPosition: '100% -30%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '274px auto',
            backgroundImage:
              "url('https://gw.alipayobjects.com/mdn/rms_a9745b/afts/img/A*BuFmQqsB2iAAAAAAAAAAAAAAARQnAQ')",
          }}
        >
          <div
            style={{
              fontSize: '20px',
              color: token.colorTextHeading,
            }}
          >
            欢迎使用 Share Swing
          </div>
          <p
            style={{
              fontSize: '14px',
              color: token.colorTextSecondary,
              lineHeight: '22px',
              marginTop: 16,
              marginBottom: 32,
              width: '65%',
            }}
          >
            ShareSwing 是一个专为学习者打造的卓越学习资源分享平台。
            本平台致力于弘扬创新、合作、共享的互联网精神，在这里，您可以轻松获取精心整理的学习笔记、权威的研究报告、实用的学习工具以及丰富的学习资源等。
            无论您是在为考试备战，还是在为个人兴趣拓展知识领域，ShareSwing 都将成为您学习之旅中不可或缺的得力伙伴，助力您在知识的海洋中乘风破浪，不断前行。
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <InfoCard
              index={1}
              href="https://umijs.org/docs/introduce/introduce"
              title="创新"
              desc="敢于突破常规，勇于探索未知领域，以新颖独特的思维方式和方法解决问题。创新精神驱使人们不断挑战既有观念，突破传统束缚，开发出前所未有的产品、服务和解决方案。"
            />
            <InfoCard
              index={2}
              title="合作"
              href="https://ant.design"
              desc="相互协作、相互支持，合作精神促使不同个体发挥各自的优势，实现资源的整合与优化配置。通过有效的沟通、协调和信任，合作能够汇聚各方力量，形成强大的合力，攻克难题，创造出超越个体能力的价值。"
            />
            <InfoCard
              index={3}
              title="共享"
              href="https://procomponents.ant.design"
              desc="促进信息流通和知识的普及，减少重复劳动和资源浪费。通过共享，人们能够站在他人的肩膀上，加速自身的成长和发展，同时也为社会的公平和共同进步创造了条件。"
            />
          </div>
        </div>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
