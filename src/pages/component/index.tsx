import React from 'react';
import { Accordion, List } from 'antd-mobile';
import { history } from 'umi';
import styles from './index.less';

const components = [
  {
    title: 'Layout 基本布局',
    key: 'layout',
    list: [
      {
        title: 'Flex 布局',
        path: '/component/flex',
      },
    ],
  },
];

const ComponentPage: React.FC = () => (
  <section className={styles.container}>
    <header>Antd mobile components</header>
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

export default ComponentPage;
