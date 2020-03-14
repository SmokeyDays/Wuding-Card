import { useState } from 'react'
import { connect } from 'dva';
import { Menu, Item, MenuProvider, Separator } from 'react-contexify-menu';
import { Button } from 'antd';
import classNames from 'classnames';
import _ from 'lodash';
import Card from './Card';

import styles from './MyCardsInHand.less';

const CARD_WIDTH = 150
const CARD_SCALE = 1.4
const SIDE_WIDTH = 800; // 顶边宽度
const ANGLE = Math.PI / 3; // 扇形展开角度
const middlePointHeight = Math.cos(ANGLE / 2); // 扇形定点到顶边高度
const topAndLeftByAngle = (angle = 0) => {
  const t = angle - ANGLE / 2
  // // Math.cos(t) - middlePointHeight
  // console.log((1 - Math.cos(t)) * SIDE_WIDTH)
  // // const top = 
  // console.log(angle)
  return {
    top: SIDE_WIDTH * (Math.cos(t) - middlePointHeight),
    left: SIDE_WIDTH * (0.5 + Math.sin(t)),
  }
}
console.log(Math.cos(ANGLE / 2))

function MyCardsInHand({
  className,
  cardState,
  dispatch,
}) {
  const [mouseOverIndex, SET_mouseOverIndex] = useState(Infinity);
  const cardsLength = cardState.myCardsInHand.length;

  const cardsTransform = Array.from({ length: cardsLength }, (v, k) => {
    return topAndLeftByAngle(ANGLE / (cardsLength - 1) * k)
  })
  console.log(cardsTransform)

  const wrapWidth = cardState.myCardsInHand.length > 0 ? 30 * (cardState.myCardsInHand.length - 1) + CARD_WIDTH : 0;

  // 设置角度
  const setVisible = (_id, visible) => {
    dispatch({ type: 'card/setMyCard', key: 'myCardsInHand', _id, data: { visible } });
  }

  const moveToSpace = (toSpace, cards) => {
    dispatch({
      type: 'card/moveMyCards',
      fromSpace: 'myCardsInHand',
      toSpace,
      cards
    });
  }

  const onMouseOver = (index) => {
    // SET_mouseOverIndexWithDebounce(index);
    SET_mouseOverIndex(index);
  }

  const onMouseLeaveCards = () => {
    // SET_mouseOverIndexWithDebounce(Infinity);
    SET_mouseOverIndex(Infinity);
  }



  return (
    <div
      onMouseLeave={onMouseLeaveCards}
      className={classNames(styles.MyCardsInHand, className)}
      style={{ width: wrapWidth, marginLeft: - wrapWidth / 2 }}
    >
      {cardState.myCardsInHand.map((item, index) => <div
        key={item._id}
        className={classNames(
          styles.card,
        )}
        style={{
          left: index <= mouseOverIndex ? index * 30 : (index - 1) * 30 + CARD_WIDTH * CARD_SCALE,
          transform: index === mouseOverIndex ? `translateY(-${CARD_WIDTH * 1.34 * (CARD_SCALE - 1) / 2}px)` : 'translateY(0)',
        }}
        onMouseOver={() => onMouseOver(index)}
      >
        <MenuProvider id={`myCardsInHand_${item._id}`}>
          <Card card={item} key={item._id} width={index === mouseOverIndex ? CARD_WIDTH * CARD_SCALE : CARD_WIDTH} />
        </MenuProvider>
      </div>)}
      {/* 单张卡片的右键菜单 */}
      {cardState.myCardsInHand.map((item) => <Menu key={item._id} id={`myCardsInHand_${item._id}`}>
        <Item
          onClick={() => setVisible(item._id, 'EVERYONE')}
          disabled={item.visible === 'EVERYONE'}
        >给对面看</Item>
        <Item
          onClick={() => setVisible(item._id, 'MYSELF')}
          disabled={item.visible === 'MYSELF'}
        >仅自己看</Item>
        <Item
          onClick={() => setVisible(item._id, null)}
          disabled={!item.visible}
        >谁都别看</Item>
        <Separator />
        <Item
          onClick={() => moveToSpace('myCardsInBattlefield', [item])}
          disabled={!item.visible}
        >移至战场</Item>
        <Item
          onClick={() => moveToSpace('myCardsInStack', [item])}
          disabled={!item.visible}
        >移至牌库</Item>
        <Item
          onClick={() => moveToSpace('myCardsInCemetery', [item])}
          disabled={!item.visible}
        >移至墓地</Item>
        <Item
          onClick={() => moveToSpace('myCardsInGui', [item])}
          disabled={!item.visible}
        >移至归墟</Item>
      </Menu>)}
    </div>
  )
}

export default connect(state => ({
  cardState: state.card
}))(MyCardsInHand);