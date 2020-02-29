import styles from './Cards.less';

function Cards({
  cards,
}) {

  return <div className={styles.Cards}>
    <div className={styles.num}>{cards.length}</div>
  </div>
}

export default Cards