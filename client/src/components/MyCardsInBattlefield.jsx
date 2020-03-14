import { useState, useEffect } from 'react'
import { connect } from 'dva';
import { Menu, Item, MenuProvider, Separator } from 'react-contexify-menu';
import { Modal, Input, Switch } from 'antd';
import classNames from 'classnames';
import Card from './Card';
import CardInfo from './CardInfo';
import styles from './MyCardsInBattlefield.less';

// 一排正常卡片
function CardsRow({ userCards, className, style, onShowInfo }) {
  const onMouseOverCard = (e, index) => {
    const { top, left } = e.currentTarget.getBoundingClientRect() || {}

    onShowInfo({
      card: userCards[index],
      style: {
        left,
        top: top + 126,
      }
    });
  }

  const cardsTransform = Array.from({ length: userCards.length }, (v, index) => ({
    x: 100 * index + 5
  })); // 卡片们的transform数据数组
  return (<div
    className={classNames(styles.cardsRow, className)}
    onMouseLeave={(e) => onMouseOverCard(e, Infinity)}
    style={style}
  >
    {userCards.map((item, index) => {
      const x = cardsTransform[index].x;
      // const y = -20 - (index === mouseOverIndex ? 20 : 0);
      return (<div
        key={item._id}
        className={styles.item}
        style={{
          transform: `translateX(${x}px)`
        }}
        onMouseOver={(e) => onMouseOverCard(e, index)}
      >

        <div className={styles.card}>
          <MenuProvider id={`myCardsInBattlefield_${item._id}`}>
            <Card
              card={item}
              key={item._id}
              width={90}
              viewType="mini"
            />
          </MenuProvider>
        </div>
      </div>)
    })}
  </div>)
}

function TagModal({ card, onOk, onCancel }) {

  const [tag, SET_tag] = useState();
  const [horizontal, SET_horizontal] = useState();

  useEffect(() => {
    const setState = () => {
      if (card) {
        SET_tag(card.tag)
        SET_horizontal(!!card.horizontal)
      }
    }
    setState();
  }, [card])

  const onClickOk = () => {
    onOk({
      _id: card ? card._id : '',
      tag,
      horizontal,
    })
  }
  return <Modal
    title="设置标记/横置"
    onCancel={onCancel}
    onOk={onClickOk}
    visible={!!card}
    destroyOnClose
    className={styles.TagModal}
  >
    <div className={styles.row}>
      <span className={styles.label}>标记物</span>
      <Input value={tag} onChange={e => SET_tag(e.target.value)} placeholder="输入标记值" />
    </div>
    <div className={styles.row}>
      <span className={styles.label}>是否横置</span>
      <Switch checked={horizontal} onChange={SET_horizontal} />
    </div>
  </Modal>
}

function MyCardsInBattlefield({
  className,
  cardState,
  dispatch,
  style,
}) {
  const [cardInfoProps, SET_cardInfoProps] = useState({});
  const [tagModalCard, SET_tagModalCard] = useState(null);
  const myCardsInBattlefield = cardState.myCardsInBattlefield//.slice(0, sliderValue)
  const firstRow = myCardsInBattlefield.slice(0, 6);
  const secondRow = myCardsInBattlefield.slice(6, 11);

  const firstRowWidth = firstRow.length * 100; // 展开宽度
  const secondRowWidth = secondRow.length * 100; // 展开宽度

  // 设置卡片可见状态
  const setVisible = (_id, visible) => {
    dispatch({ type: 'card/setMyCard', key: 'myCardsInBattlefield', _id, data: { visible } });
  }
  // 移动至
  const moveToSpace = (toSpace, card, isEnd = true) => {
    dispatch({
      type: 'card/moveMyCards',
      fromSpace: 'myCardsInBattlefield',
      toSpace,
      cards: [card],
      isEnd,
    });
  }

  const setTag = ({ _id, tag, horizontal }) => {
    dispatch({
      type: 'card/setMyCard',
      key: 'myCardsInBattlefield',
      _id,
      data: { tag, horizontal }
    });
    SET_tagModalCard(null);
  }

  return (
    <div
      className={classNames(styles.MyCardsInBattlefield, className)}
      style={style}
    >
      {/* 第一排 */}
      {firstRow.length > 0 && (<CardsRow className={styles.firstRow} style={{ width: firstRowWidth, marginLeft: -firstRowWidth / 2 }} userCards={firstRow} onShowInfo={SET_cardInfoProps} />)}
      {/* 第二排 */}
      {secondRow.length > 0 && (<CardsRow className={styles.secondRow} style={{ width: secondRowWidth, marginLeft: -secondRowWidth / 2 }} userCards={secondRow} onShowInfo={SET_cardInfoProps} />)}
      {/* 卡片信息 */}
      <CardInfo {...cardInfoProps} />
      <TagModal
        card={tagModalCard}
        onOk={setTag}
        onCancel={() => SET_tagModalCard(null)}
      />
      <div className={styles.menus}>
        {/* 单张卡片的右键菜单 */}
        {myCardsInBattlefield.map((item) => <Menu style={{ zIndex: 999 }} key={item._id} id={`myCardsInBattlefield_${item._id}`}>
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
            onClick={() => SET_tagModalCard(item)}
          >标记/横置</Item>
          <Separator />
          <Item
            onClick={() => moveToSpace('myCardsInHand', item)}
            disabled={cardState.myCardsInHand.length >= cardState.myCardsInHandMax}
          >移至手牌</Item>
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
}))(MyCardsInBattlefield);