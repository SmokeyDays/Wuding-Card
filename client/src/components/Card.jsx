import classNames from 'classnames';
import { Stage, Layer, Rect, Text } from 'react-konva';
import styles from './Card.less';

function Card({
  card,
  width = 150,
  className,
  textColor="#000",
  backgroundColor="#ffeec5",
}) {

  return <div style={{ width, height: width * 4 / 3 }} className={classNames(styles.Card, className)}>
    
    <Stage width={150} height={200}>
    <Layer>
      <Rect width={150} height={200} fill={backgroundColor} />
      <Text text={card.card.name} fill={textColor}  />
    </Layer>
    </Stage>
  </div>
}

export default Card;