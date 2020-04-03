import { connect } from 'dva';
import MyCardsInStack from '@/components/MyCardsInStack';
import MyCardsInHand from '@/components/MyCardsInHand';
import MyCardsInBattlefield from '@/components/MyCardsInBattlefield';
import Roll from '@/components/Roll';
import styles from './room.less';

function Room({
  authState,
  cardState,
}) {
  return (
    <div className={styles.Room}>
      <div className={styles.table}>
        <div className={styles.myStatus}>
          
        </div>
        <MyCardsInStack className={styles.myCardsInStack} />
        <MyCardsInHand className={styles.myCardsInHand} />
        <MyCardsInBattlefield className={styles.myCardsInBattlefield} />
        <Roll className={styles.roll} />
      </div>
    </div>
  )
}
export default connect(state => ({
  roomState: state.room,
  cardState: state.card,
  authState: state.auth,
}))(Room);