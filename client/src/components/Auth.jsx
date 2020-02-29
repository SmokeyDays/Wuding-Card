import React, { useState } from 'react';
import { Button, Input, message } from 'antd';
import { connect } from 'dva';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styles from './Auth.less';


function Auth({
  authState = {},
  dispatch,
}) {
  const [stub, SET_stub] = useState('');
  const [nickName, SET_nickName] = useState('');

  const onStubChange = (e) => {
    SET_stub(e.target.value)
  }
  const onNickNameChange = (e) => {
    SET_nickName(e.target.value)
  }
  const loginByStub = () => {
    if (!stub) {
      message.warn('凭证为空或格式不对');
      return false;
    }
    dispatch({ type: 'auth/login', stub });
  }
  const createUser = () => {
    if (!nickName) {
      message.warn('昵称为空，已为您随机姓名');
    }
    dispatch({ type: 'auth/login', nickName });
  }
  const logout = () => {
    dispatch({ type: 'auth/logout' });
  }
  const onCopyStub = () => {
    message.success('已经复制到粘贴板');
  }
  return (
    <div className={styles.Auth}>
      {authState.currentUser ? (
        <div className={styles.currentUser}>
          <span>{authState.currentUser.nickName}</span>
          <CopyToClipboard text={authState.currentUser.stub} onCopy={onCopyStub}>
            <Button type='primary' style={{ marginLeft: 10 }}>复制凭证</Button>
          </CopyToClipboard>
          <Button style={{ marginLeft: 10 }} onClick={logout}>退出</Button>
        </div>
      ) : (<div className={styles.login}>
        <Input value={stub} onChange={onStubChange} placeholder="在这里粘贴登录凭证" />
        <Button style={{ marginLeft: 10 }} onClick={loginByStub}>使用凭证登录</Button>
        <div style={{ marginLeft: 10, flexShrink: 0 }}>或</div>
        <Input style={{ marginLeft: 10 }} value={nickName} onChange={onNickNameChange} placeholder="在这里输入昵称" />
        <Button style={{ marginLeft: 10 }} type="primary" onClick={createUser}>新建用户</Button>
      </div>)}

    </div>
  );
}

export default connect(state => ({
  authState: state.auth
}))(Auth);