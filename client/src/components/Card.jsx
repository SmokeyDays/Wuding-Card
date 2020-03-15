import classNames from 'classnames';
import { Stage, Layer, Group, Rect, Text, Circle } from 'react-konva';
import styles from './Card.less';

function FullCard({ card, width, height, bgColor, color }) {
  const otherTextStyle = {
    fontFamily: 'STSong',
    fill: color,
    fontSize: width * 0.06,
  }
  const nameFontSize = Math.round(height * (Math.min(1 / (card.card.name.length * 2), 0.075)))


  return (
    <Group >
      <Rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill={bgColor}
      />
      {/* 名称 */}
      <Text
        text={card.card.name}
        fontFamily="STSong"
        fontStyle="bold"
        fill={color}
        width={nameFontSize}
        fontSize={nameFontSize}
        x={width * 0.05}
        y={width * 0.05}
      />
      <Text
        {...otherTextStyle}
        text={`加权：${card.card.weight || ''}`}
        x={width * 0.2}
        y={width * 0.05}
      />
      <Text
        {...otherTextStyle}
        text={`类别：${card.card.type || ''}`}
        x={width * 0.55}
        y={width * 0.05}
      />
      <Text
        {...otherTextStyle}
        text={`属性：${card.card.nature || ''}`}
        x={width * 0.2}
        y={width * 0.13}
      />
      <Text
        {...otherTextStyle}
        text={`门派：${card.card.group || ''}`}
        x={width * 0.55}
        y={width * 0.13}
      />
      <Text
        {...otherTextStyle}
        text={`修为：${card.card.level || ''}`}
        x={width * 0.2}
        y={width * 0.21}
      />
      <Text
        {...otherTextStyle}
        text={`上场：${card.card.cost || ''}`}
        x={width * 0.55}
        y={width * 0.21}
      />
      <Text
        {...otherTextStyle}
        text={`维持：${card.card.upkeep || ''}`}
        x={width * 0.2}
        y={width * 0.29}
      />
      <Text
        {...otherTextStyle}
        text={`攻击：${card.card.attack || ''}`}
        x={width * 0.55}
        y={width * 0.29}
      />
      <Text
        {...otherTextStyle}
        text={`防御：${card.card.defense || ''}`}
        x={width * 0.2}
        y={width * 0.37}
      />
      <Text
        {...otherTextStyle}
        text={`耐力：${card.card.endurance || ''}`}
        x={width * 0.55}
        y={width * 0.37}
      />
      <Text
        {...otherTextStyle}
        text={`${card.card.condition || ''}\n${card.card.effect || ''}`}
        x={width * 0.2}
        y={width * 0.5}
        width={width * 0.75}
      />
    </Group>
  )
}

function MiniCard({ card, width, height }) {

  const nameFontSize = Math.round(width * 0.18)
  const visibleSize = Math.round(width * 0.14)
  const tagCircleRadius = Math.round(width * 0.14)
  const horizontalSize = [width * 0.3, width * 0.2]

  return (

    <Group >
      <Rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill="#fff"
      />
      {/* 名称 */}
      <Text
        text={card.card.name}
        fontFamily="STSong"
        fontStyle="bold"
        fill="#000"
        width={width * 0.9}
        fontSize={nameFontSize}
        x={width * 0.05}
        y={width * 0.05}
      />
      {/* 可见状态 */}
      {card.visible === 'EVERYONE' && <Text
        text="&#xe85c;"
        fontFamily="iconfont"
        fill="#ff4d4f"
        fontSize={visibleSize}
        x={width * 0.05}
        y={height - width * 0.05 - nameFontSize}
      />}
      

      {card.horizontal ? <Rect
        fill='#36a852'
        cornerRadius={4}
        x={width * 0.05}
        y={width * 0.6 + horizontalSize[1] /4}
        width={horizontalSize[0]}
        height={horizontalSize[1]}
      /> : null}
      {card.horizontal ? <Text
        text="横"
        fill='#fff'
        fontSize={10}
        x={width * 0.05}
        y={width * 0.6 + horizontalSize[1] /4}
        width={horizontalSize[0]}
        height={horizontalSize[1]}
        align='center'
        verticalAlign='middle'
      /> : null}

      {card.tag ? <Circle
        fill='#ff4d4f'
        radius={tagCircleRadius}
        x={width * 0.95 - tagCircleRadius}
        y={width * 0.6 + tagCircleRadius}
      /> : null}
      {card.tag ? <Text
        fontSize={nameFontSize}
        fill='#fff'
        align='center'
        verticalAlign='middle'
        text={card.tag}
        x={width * 0.95 - tagCircleRadius * 2}
        y={width * 0.6}
        width={tagCircleRadius * 2}
        height={tagCircleRadius * 2}
      /> : null}
    </Group>

  )
}

function SideCard({ card, width, height }) {
  const nameFontSize = Math.round(height * 0.075)

  return (
    <Group >
      <Rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill="#fff"
      />
      {/* 名称 */}
      <Text
        text={card.card.name.slice(0, 6)}
        fontFamily="STSong"
        fontStyle="bold"
        fill="#000"
        width={nameFontSize * 1.2}
        fontSize={nameFontSize}
        x={width * 0.05}
        y={card.visible === 'EVERYONE' ? width * 0.05 + nameFontSize :width * 0.05}
      />
      <Text
        text={card.card.name.slice(6)}
        fontFamily="STSong"
        fontStyle="bold"
        fill="#000"
        width={nameFontSize * 1.2}
        fontSize={nameFontSize}
        x={width * 0.05 + nameFontSize + 2}
        y={card.visible === 'EVERYONE' ? width * 0.05 + nameFontSize :width * 0.05}
      />
      {/* 可见状态 */}
      {card.visible === 'EVERYONE' && <Text
        text="&#xe85c;"
        fontFamily="iconfont"
        fill="#ff4d4f"
        fontSize={nameFontSize}
        x={width * 0.05}
        y={width * 0.05}
      />}
    </Group>


  )
}

function BackCard({ width, height }) {

  return (<Group >
    <Rect
      x={0}
      y={0}
      width={width}
      height={height}
      fill="#c9c9cb"
    />
    <Rect
      x={width * 0.07}
      y={width * 0.07}
      width={width - width * 0.07 * 2}
      height={height - width * 0.07 * 2}
      fill="#c9c9cb"
      stroke="#666"
      strokeWidth={1}
    />
    <Rect
      x={width * 0.1}
      y={width * 0.1}
      width={width - width * 0.1 * 2}
      height={height - width * 0.1 * 2}
      fill={'#999'}
      stroke={'#666'}
      strokeWidth={1}
    />
  </Group>)
}

function Card({
  card,
  className,
  width = 150,
  viewType = 'mini',
  bgColor = '#fff',
  color = '#000'
}) {
  const height = width * 1.34
  return <div className={classNames(styles.Card, className)}>
    <Stage width={width} height={height}>
      <Layer>
        {(!card.visible) ? (
          <BackCard width={width} height={height} />
        ) : (
            viewType === 'full' ? (
              <FullCard card={card} width={width} height={height} bgColor={bgColor} color={color} />
            ) : (
                viewType === 'mini' ? (
                  <MiniCard card={card} width={width} height={height} bgColor={bgColor} color={color} />
                ) : (
                    viewType === 'side' ? (
                      <SideCard card={card} width={width} height={height} bgColor={bgColor} color={color} />
                    ) : null
                  )
              )
          )}
      </Layer>
    </Stage>
  </div>
}

export default Card;