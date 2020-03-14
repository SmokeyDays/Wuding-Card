import { Modal } from 'antd';
import { Descriptions } from 'antd';

function card_info(card) {
  // console.log(card.card)
  const cardKeyMap = {
    weight: '加权',
    type: '类型',
    nature: '属性',
    group: '门派',
    // name: '名称',
    level: '修为',
    cost: '上场灵力',
    upkeep: '维持灵力',
    condition: '其他触发条件/代价',
    effect: '效果',
    attack: '攻击力',
    defense: '防御力',
    endurance: '耐力',
  }
  Modal.info({
    title: card.card.name,
    width: 800,
    content: (
      <Descriptions>
        {Object.keys(cardKeyMap).map(key => (
          <Descriptions.Item
            key={key}
            label={cardKeyMap[key]}
          >{card.card[key]}</Descriptions.Item>
        ))}
      </Descriptions>
    ),
    // onOk() {},
  });
}

window.g_card_info = card_info;