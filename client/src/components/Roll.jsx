import { connect } from 'dva';
import { Button } from 'antd';
import classNames from 'classnames';
import styles from './Roll.less';

function Roll({
  className,
  rollState,
  dispatch,
}) {
  const roll = () => {
    dispatch({ type: 'roll/roll'});
  }
 
  return <div className={classNames(styles.Roll, className)}>
    <div>对面摇点：{rollState.oppositeRoll || '-'}</div>
    <div>我的摇点：{rollState.myRoll || '-'}</div>
    <Button.Group>
      <Button onClick={roll}>摇点</Button>
    </Button.Group>
  </div>
}

export default connect(state => ({
  rollState: state.roll,
}))(Roll);