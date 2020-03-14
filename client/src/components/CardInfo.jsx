
import classNames from 'classnames'
import Card from './Card';
import styles from './CardInfo.less';

function CardInfo({ card, className, style }) {
  return card ? <div className={classNames(styles.CardInfo, className)} style={style}>
    <Card
      card={card}
      width={200}
      viewType="full"
      bgColor="#000"
      color='#fff'
    />
  </div> : null
}

export default CardInfo;
