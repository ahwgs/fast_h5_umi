import React from 'react';
import { Accordion, List } from 'antd-mobile';
import { history } from 'umi';
import styles from './index.less';

const components = [
  {
    title: 'Basic 基础',
    key: 'basic',
    list: [
      {
        title: '权限组件',
        path: '/expand/auth',
      },
    ],
  },
];

const ExpandPage: React.FC = () => (
  <section className={styles.container}>
    <header>拓展组件</header>
    <Accordion>
      {components.map(group => (
        <Accordion.Panel key={group.key} header={group.title}>
          <List key={group.key}>
            {group.list.map(com => (
              <List.Item onClick={() => history.push(com.path)} key={com.path}>
                {com.title}
              </List.Item>
            ))}
          </List>
        </Accordion.Panel>
      ))}
    </Accordion>
  </section>
);

export default ExpandPage;
