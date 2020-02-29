import { connect } from 'dva';
import MyCardStack from '@/components/MyCardStack';
import styles from './room.less';

function Room() {
  return (
    <div className={styles.Room}>
      <div className={styles.table}>
        <div className={styles.myStatus}>

        </div>
        <MyCardStack className={styles.myCardStack} />
      </div>
    </div>
  )
}
export default connect(state => ({
  roomState: state.room,
  authState: state.auth,
}))(Room);