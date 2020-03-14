import { useState } from 'react';
import { connect } from 'dva';
import { Menu, Item, MenuProvider } from 'react-contexify';
import { Modal, Button, Select, InputNumber } from 'antd';
import _ from 'lodash';
import classNames from 'classnames';
import Card from './Card';
import styles from './MyCardsInStack.less';


const CardsSelectModal = connect(state => ({
  cardState: state.card
}))(({
  cardState,
  cards,
  visible,
  onCancel,
  handleMoveCards,
}) => {
  const [num, SET_num] = useState(1);
  const [filterName, SET_filterName] = useState('');
  const [filterType, SET_filterType] = useState('');

  const cardNames = _.keys(_.groupBy(cards, item => item.card.name));
  const cardTypes = _.keys(_.groupBy(cards, item => item.card.type));

  let filteredCards = cards;
  if (filterName) {
    filteredCards = filteredCards.filter(item => item.card.name === filterName)
  }
  if (filterType) {
    filteredCards = filteredCards.filter(item => item.card.type === filterType)
  }
  filteredCards = filteredCards.slice(0, num);

  return (
    <Modal
      destroyOnClose
      className={styles.CardsSelectModal}
      visible={visible}
      title='选牌器'
      onCancel={onCancel}
      width={680}
      footer={[
        <Button
          key="1"
          type="primary"
          disabled={
            filteredCards.length === 0 || filteredCards.length + cardState.myCardsInHand.length > cardState.myCardsInHandMax
          }
          onClick={() => handleMoveCards(
            filteredCards.map(item => ({
              ...item,
              visible: !item.visible ? 'MYSELF' : item.visible,
            })),
            'myCardsInHand',
          )}
        >移至手牌</Button>,
        <Button
          key="2"
          type="primary"
          disabled={filteredCards.length === 0 || filteredCards.length + cardState.myCardsInBattlefield.length > cardState.myCardsInBattlefieldMax}
          onClick={() => handleMoveCards(
            filteredCards.map(item => ({
              ...item,
              visible: !item.visible ? 'MYSELF' : item.visible,
            })),
            'myCardsInBattlefield')}
        >移至战场</Button>,
        <Button
          key="3"
          type="primary"
          disabled={filteredCards.length === 0}
          onClick={() => handleMoveCards(filteredCards, 'myCardsInCemetery')}
        >移至墓地</Button>,
      ]}
    >
      <div className={styles.filters}>
        <span style={{ marginRight: 5 }}>选取顶部</span>
        <InputNumber
          style={{ marginRight: 5, width: 80 }}
          value={num}
          min={0}
          max={cards.length}
          onChange={SET_num}
        />
        <span style={{ marginRight: 5 }}>张牌，名称为</span>
        <Select
          style={{ marginRight: 5, width: 150 }}
          placeholder="不限"
          allowClear
          showSearch
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          onChange={(value) => { SET_filterName(value) }}
        >
          {cardNames.map(name => <Select.Option key={name}>{name}</Select.Option>)}
        </Select>
        <span style={{ marginRight: 5 }}>，且类型为</span>
        <Select
          style={{ marginRight: 5, width: 150 }}
          placeholder="不限"
          allowClear
          showSearch
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          onChange={SET_filterType}
        >
          {cardTypes.map(type => <Select.Option key={type}>{type}</Select.Option>)}
        </Select>
      </div>
      <div className={styles.result}>
        选取到{filteredCards.length}张牌
      </div>
    </Modal>
  );
})

const MyCardsInStack = connect(state => ({
  cardState: state.card
}))(({
  className,
  cardState,
  dispatch,
}) => {
  const { myCardsInStack } = cardState;
  const [cardsSelectModalVisible, SET_cardsSelectModalVisible] = useState(false);

  // 从牌组加载并洗牌
  const loadFromMyCardsGroup = () => {
    dispatch({ type: 'card/loadMyCardsInStackFromMyCardsGroup' });
  }

  // 从牌组加载并洗牌
  const ramdomSort = () => {
    dispatch({ type: 'card/randomSortMyCardsInStack' });
  }

  const handleMoveCards = (cards, toSpace) => {
    dispatch({
      type: 'card/moveMyCards',
      cards,
      fromSpace: 'myCardsInStack',
      toSpace,
    });
    SET_cardsSelectModalVisible(false);
  }

  const numClassName = myCardsInStack.length > 2 ? styles.numGt3 : styles[`numEq${myCardsInStack.length}`];

  return <div className={classNames(styles.MyCardsInStack, className)}>
    <MenuProvider id="myCardsInStack">
      <div className={classNames(styles.wrap, numClassName)}>
        {_.reverse([...myCardsInStack]).map((item, index) => (
          <div
            className={styles.card}
            key={item._id}
            style={{
              left: 0.5 * index,
            }}
          >
            <Card card={item} />
          </div>
        ))}
        <div className={styles.num}>{myCardsInStack.length} 张</div>
      </div>
    </MenuProvider>
    <Menu id='myCardsInStack'>
      <Item onClick={() => SET_cardsSelectModalVisible(true)}>选牌</Item>
      <Item onClick={loadFromMyCardsGroup}>从牌组加载并洗牌</Item>
      <Item onClick={ramdomSort}>洗牌</Item>
    </Menu>
    <CardsSelectModal
      visible={cardsSelectModalVisible}
      onCancel={() => SET_cardsSelectModalVisible(false)}
      cards={myCardsInStack}
      handleMoveCards={handleMoveCards}
    />
  </div>
})

export default MyCardsInStack;