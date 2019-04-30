import styles from './index.css';
import React from 'react';
import {connect} from 'dva';
import {Breadcrumb, Input, Row, Col, Form, Button, Table} from 'antd';
import DvaProp from "@/components/BaseProps/DvaProp";
import DvaState from "@/components/BaseProps/DvaState";

interface IProp extends DvaProp {
  pageList: { total: number, rows: [] }
}

@connect((dvaState: DvaState | any) => {
  return {
    pageList: dvaState.course.pageList,
    loading: dvaState.loading.effects['course/list']
  }
})
export default class extends React.Component<IProp> {

  private page = 1;
  private rows = 10;
  private query: any = {
    name: undefined
  }

  componentDidMount(): void {
    this.loadData();
  }

  private loadData = () => {
    this.props.dispatch({
      type: 'course/list',
      payload: {
        page: this.page,
        rows: this.rows,
        name: this.query.name
      }
    })
  }

  private onQueryChange = (e: any) => {
    if (e.target && e.target.name) {
      this.query[e.target.name] = e.target.value;
    }
  }

  private onShowSizeChange = (current: number, size: number) => {
    this.page = current;
    this.rows = size;
    this.loadData();
  }

  private onShowPageChange = (page: number) => {
    this.page = page;
    this.loadData();
  }

  private renderTable = () => {
    const columns = [{
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '级别',
      dataIndex: 'difficultyClassify.name',
      key: 'difficultyClassify_name',
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    }, {
      title: '操作',
      dataIndex: 'id',
      key: 'id',
      render: (text: any, record: any) => {
        return (<Button type="primary">操作</Button>)
      }
    }];

    const pagination = {
      simple: false,
      showSizeChanger: true,
      onShowSizeChange: this.onShowSizeChange,
      onChange: this.onShowPageChange,
      pageSize: this.rows,
      total: this.props.pageList.total,
      showTotal: (count: number) => {
        return '共有' + count + ' 条数据';
      },
    };

    return (
      <Table rowKey="id"
             loading={this.props.loading}
             dataSource={this.props.pageList.rows}
             columns={columns}
             pagination={pagination}/>
    )
  }

  private renderQuery = () => {
    const formItemLayout = {
      labelCol: {
        xs: {span: 5},
      },
      wrapperCol: {
        sm: {span: 19},
      },
    };

    return (
      <Form {...formItemLayout} onChange={this.onQueryChange}>
        <Row gutter={24} className={styles.query}>
          <Col span={6}>
            <Form.Item label="名称">
              <Input placeholder="请输入名称" name="name"/>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item>
              <Button type="primary" onClick={this.loadData}>查询</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    )
  }

  public render() {
    return (
      <div>
        <div className={styles.header}>
          <div className={styles.breadcrumb}>
            <Breadcrumb>
              <Breadcrumb.Item>首页</Breadcrumb.Item>
              <Breadcrumb.Item><a href="">列表</a></Breadcrumb.Item>
              <Breadcrumb.Item>查询</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className={styles.title}>
            查询表格
          </div>
        </div>
        <div className={styles.content}>
          {this.renderQuery()}
          {this.renderTable()}
        </div>
      </div>
    );
  }
};
