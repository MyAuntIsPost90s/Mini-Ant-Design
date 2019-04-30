import styles from './index.css';
import React from 'react';
import {Layout} from 'antd';
import CommonMenu from '@/components/CommonMenu';
import CommonNav from '@/components/CommonNav';
import BaseProp from "@/components/BaseProps/BaseProp";
import RouteUtil from "@/utils/RouteUtil";

export default class extends React.Component<BaseProp> {

  state = {
    menuCollapsed: false
  }

  private foldClick = () => {
    this.setState({
      ...this.state,
      menuCollapsed: !this.state.menuCollapsed
    })
  }

  private menuClick = (e: any) => {
    console.log(e);
  }

  private userInfoClick = (e: any) => {
    if (this.props.history) {
      switch (e.key) {
        case 'logout':
          RouteUtil.link({path: '/login', history: this.props.history});
          break;
      }
    } else {
      console.log('history不存在');
    }
  }

  public render() {
    const {Header, Content, Footer, Sider} = Layout;
    return (
      <Layout className={styles.main}>
        <Sider className={styles.menu}
               width={256}
               collapsed={this.state.menuCollapsed}>
          <CommonMenu
            onClick={this.menuClick}/>
        </Sider>
        <Layout>
          <Header className={styles.header}>
            <CommonNav
              onUserInfoClick={this.userInfoClick}
              onFoldClick={this.foldClick}
            />
          </Header>
          <Content>
            {this.props.children}
          </Content>
          <Footer style={{textAlign: 'center'}}>
            Mini Ant Design ©2018 Created by cch
          </Footer>
        </Layout>
      </Layout>
    );
  }
};
