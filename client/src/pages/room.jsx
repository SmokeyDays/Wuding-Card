import { connect } from 'dva';
import { Avatar } from 'antd'
import MyCardsInStack from '@/components/MyCardsInStack';
import styles from './room.less';

function Room({
  authState,
  cardState,
}) {
  console.log(cardState)
  return (
    <div className={styles.Room}>
      <div className={styles.table}>
        <div className={styles.myStatus}>
          {authState.currentUser && <Avatar style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }} size="large">
            {authState.currentUser.nickName[0]}
          </Avatar>}
        </div>
        <MyCardsInStack className={styles.myCardsInStack} />
      </div>
    </div>
  )
}
export default connect(state => ({
  roomState: state.room,
  cardState: state.card,
  authState: state.auth,
}))(Room);