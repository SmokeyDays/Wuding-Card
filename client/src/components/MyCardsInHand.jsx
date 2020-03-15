import { useState } from 'react'
import { connect } from 'dva';
import { Menu, Item, MenuProvider, Separator } from 'react-contexify-menu';
import classNames from 'classnames';
import Card from './Card';
import CardInfo from './CardInfo';
import styles from './MyCardsInHand.less';


// 一排正常卡片
function CardsRow({ userCards, className, style, rowWidth, onShowInfo }) {

  const onMouseOverCard = (e, index) => {
    const {top, left} = e.currentTarget.getBoundingClientRect() || {}
    onShowInfo({
      card: userCards[index],
      style: {
        left,
        top: top-280,
      }
    });
  }

  const cardsTransform = Array.from({ length: userCards.length }, (v, index) => ({
    x: Math.round(rowWidth / 30 * index)
  })); // 卡片们的transform数据数组

  let pianyi = 0;
  return (<div
    className={classNames(styles.cardsRow, className)}
    onMouseLeave={(e) => onMouseOverCard(e, Infinity)}
    style={style}
  >
    {userCards.map((item, index) => {
      const x = cardsTransform[index].x + pianyi;
      if(item.card.name.length > 6) {
        pianyi += 12;
      }
      return (<div
        key={item._id}
        className={styles.item}
        style={{
          transform: `translateX(${x}px)`
        }}
        onMouseOver={(e) => onMouseOverCard(e, index)}
      >

        <div className={styles.card}>
          <MenuProvider id={`myCardsInHand_${item._id}`}>
            <Card
              card={item}
              key={item._id}
              width={130}
              viewType="side"
            />
          </MenuProvider>
        </div>

      </div>)
    })}
  </div>)
}



function MyCardsInHand({
  className,
  cardState,
  dispatch,
  style,
}) {

  const [cardInfoProps, SET_cardInfoProps] = useState({});

  const myCardsInHand = cardState.myCardsInHand//.slice(0, sliderValue)
  const firstRow = myCardsInHand.slice(0, 30);
  const secondRow = myCardsInHand.slice(30, 60);
  const rowWidth = 900;

  const firstRowWidth = Math.round(rowWidth / 30 * (firstRow.length - 1)) + 150; // 展开宽度
  const secondRowWidth = Math.round(rowWidth / 30 * (secondRow.length - 1)) + 150; // 展开宽度

  // 设置卡片可见状态
  const setVisible = (_id, visible) => {
    dispatch({ type: 'card/setMyCard', key: 'myCardsInHand', _id, data: { visible } });
  }
  // 移动至
  const moveToSpace = (toSpace, card, isEnd = true) => {
    dispatch({
      type: 'card/moveMyCards',
      fromSpace: 'myCardsInHand',
      toSpace,
      cards: [card],
      isEnd,
    });
  }

  return (
    <div
      className={classNames(styles.MyCardsInHand, className)}
      style={style}
    >
      {firstRow.length > 0 && (<CardsRow
        className={styles.firstRow}
        style={{ width: firstRowWidth, marginLeft: -firstRowWidth / 2 }}
        userCards={firstRow}
        rowWidth={rowWidth}
        onShowInfo={SET_cardInfoProps}
      />)}
      {secondRow.length > 0 && (<CardsRow
        className={styles.secondRow}
        style={{ width: secondRowWidth, marginLeft: -secondRowWidth / 2 }}
        userCards={secondRow}
        rowWidth={rowWidth}
        onShowInfo={SET_cardInfoProps}
      />)}
      <CardInfo {...cardInfoProps} />
      <div className={styles.menus}>
        {/* 单张卡片的右键菜单 */}
        {myCardsInHand.map((item) => <Menu style={{ zIndex: 999 }} key={item._id} id={`myCardsInHand_${item._id}`}>
          <Item
            onClick={() => setVisible(item._id, 'EVERYONE')}
            disabled={item.visible === 'EVERYONE'}
          >给对面看</Item>
          <Item
            onClick={() => setVisible(item._id, 'MYSELF')}
            disabled={item.visible === 'MYSELF'}
          >仅自己看</Item>
          <Item
            onClick={() => setVisible(item._id, false)}
            disabled={!item.visible}
          >谁都别看</Item>
          <Separator />
          <Item
            onClick={() => moveToSpace('myCardsInBattlefield', item)}
            disabled={cardState.myCardsInBattlefield.length >= cardState.myCardsInBattlefieldMax}
          >移至战场</Item>
          <Item
            onClick={() => moveToSpace('myCardsInStack', item, false)}
          >移至牌库顶部</Item>
          <Item
            onClick={() => moveToSpace('myCardsInStack', item)}
          >移至牌库底部</Item>
          <Item
            onClick={() => moveToSpace('myCardsInCemetery', item)}
          >移至墓地</Item>
          <Item
            onClick={() => moveToSpace('myCardsInGui', item)}
          >移至归墟</Item>
          

        </Menu>)}
      </div>
    </div>
  )
}

export default connect(state => ({
  cardState: state.card
}))(MyCardsInHand);