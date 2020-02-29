import { useState } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Button, Modal, Form, Input, Switch, List, Card, PageHeader } from 'antd';
import Auth from '@/components/Auth';
import styles from './index.less';


function Room({ room }) {
  return (
    <Card
      className={styles.room}
      actions={[
        <Link to={`/room?roomId=${room._id}&action=duel`}>对战</Link>,
        <Link to={`/room?roomId=${room._id}&action=watch`}>观战</Link>,
      ]}>
      <div>房间ID：{room._id}</div>
      <div>房间名：{room.name}</div>
    </Card>
  )
}

const CreateRoomModal = Form.create({ name: 'create_room' })(
  ({
    visible,
    form,
    onCancel,
    onOk,
  }) => {
    const { getFieldDecorator, validateFields } = form;

    const handleSubmit = () => {
      validateFields((errors, values) => {
        if (errors) return false;
        onOk(values);
      })
    }
    return (
      <Modal visible={visible} title="创建房间" onCancel={onCancel} onOk={handleSubmit} destroyOnClose>
        <Form className="my-form">
          <Form.Item label="房间名称">
            {getFieldDecorator('name', {
              rules: [
                { required: true, message: '房间名称为必填项' },
                { max: 20, message: '房间名称不超过20字' },
              ]
            })(
              <Input placeholder="输入房间名称" />
            )}
          </Form.Item>
          <Form.Item label="自动销毁" help="房间无人10分钟后自动销毁">
            {getFieldDecorator('autoDestroy', {
              initialValue: true,
              valuePropName: 'checked',
            })(
              <Switch />
            )}
          </Form.Item>
          <Form.Item label="允许观战">
            {getFieldDecorator('allowWatch', {
              initialValue: true,
              valuePropName: 'checked',
            })(
              <Switch />
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
)

function Home({
  roomState,
  loadingRooms,
  dispatch,
}) {
  const [createRoomModalVisible, SET_createRoomModalVisible] = useState(false);
  const handleCreateRoom = (values) => {
    dispatch({ type: 'room/createRoom', data: values });
    SET_createRoomModalVisible(false);
  }
  return (
    <div className={styles.Home}>
      <div className={styles.header}>
          <div className={styles.brand}>无定牌</div>
          <Auth />
        </div>
      <PageHeader
        style={{ margin: '30px 0' }}
        title="游戏大厅"
        extra={[
          <Input.Search key='0' size="large" style={{ width: 400 }} placeholder="输入房间名或房间ID" enterButton="搜索房间" />,
          <span key='1' style={{ marginLeft: 10 }}>或</span>,
          <Button key='2' size="large" style={{ marginLeft: 10 }} onClick={() => SET_createRoomModalVisible(true)}>创建房间</Button>,
        ]}
      ></PageHeader>
      <CreateRoomModal
        visible={createRoomModalVisible}
        onCancel={() => SET_createRoomModalVisible(false)}
        onOk={handleCreateRoom}
      />
      <div className={styles.rooms}>
        <List
          grid={{ gutter: 24, column: 3 }}
          dataSource={roomState.rooms}
          locale={{ emptyText: '暂无房间' }}
          loading={loadingRooms}
          pagination={{
            pageSize: 15,
            total: roomState.roomsTotal
          }}
          renderItem={room => (
            <List.Item>
              <Room room={room} />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

export default connect(state => ({
  roomState: state.room,
  loadingRooms: state.loading.effects['room/fetchRooms'],
}))(Home);