import { connect } from 'dva';

import styles from './MyCardStack.less';

function MyCardStack({
  cardState,
}) {
  const { myCardStack } = cardState;
  return <div className={styles.MyCardStack}>
    <div className={styles.num}>{myCardStack.length}</div>
  </div>
}

export default connect(state => ({
  cardState: state.card
}))(MyCardStack);