/* eslint-disable */
import { connect } from 'dva';
import { Button } from 'antd';
// import { Stage, Layer, Group, Rect, Text } from 'react-konva';
import classNames from 'classnames';
import styles from './MyCharInfo.less';

function MyHealthInfo({
  className,
  charState,
  dispatch,
}) {
  const changeHealth = (diff) => {
    dispatch({ type: 'charInfo/changeHealth', diff });
  }
  const wid = charState.myHealth * 10;
  return <div className={classNames(styles.MyCharInfo, className)}>
    <div style={{ position: "absolute", bottom: "23px" }}>
      <Button.Group>
        <Button className={styles.MyHealthBTN} onClick={() => changeHealth(1)}>+</Button>
        <Button className={styles.MyHealthBTN} onClick={() => changeHealth(-1)}>-</Button>
      </Button.Group>
    </div>
    <div style={{ backgroundColor: "#666666", height: "22px", width: "50%", position: "absolute", bottom: "0px", left: "0px" }}>
      <div className={styles.bar} style={{ backgroundColor: "#FF0000", width: wid + "%", height: "inherit", position: "absolute", right: "0px", bottom: "0px", textAlign: "right" }} className="iconfont icon-fire"></div>
      <p style={{ zIndex: "10000", position: "absolute", color: "#FFFFFF" }}>命火: {charState.myHealth || '0'}</p>
    </div>

  </div>
}

function MyLevelInfo({
  className,
  charState,
  dispatch,
}) {
  const changeLevel = (diff) => {
    dispatch({ type: 'charInfo/changeLevel', diff });
  }
  const wid = charState.myLevel * 10;
  return <div className={classNames(styles.MyCharInfo, className)}>
    <div style={{ position: "absolute", bottom: "57px", right: "0px" }}>
      <Button.Group>
        <Button className={styles.MyLevelBTN} onClick={() => changeLevel(1)}>+</Button>
        <Button className={styles.MyLevelBTN} onClick={() => changeLevel(-1)}>-</Button>
      </Button.Group>
    </div>
    <div style={{ backgroundColor: "#666666", height: "11px", width: "50%", position: "absolute", top: "0px", right: "0px" }}>
      <div className={styles.bar} style={{ backgroundColor: "#0000C6", width: wid + "%", height: "inherit", position: "absolute", left: "0px", bottom: "0px", textAlign: "left" }}></div>
      <p style={{ zIndex: "10000", position: "absolute", bottom: "-10px", right: "0px", color: "#FFFFFF", fontSize: "9px" }}>修为: {charState.myLevel || '0'}</p>
    </div>

  </div>
}

function MyManaInfo({
  className,
  charState,
  dispatch,
}) {
  const changeMana = (diff) => {
    dispatch({ type: 'charInfo/changeMana', diff });
  }
  const wid = charState.myMana * 10;
  return <div className={classNames(styles.MyCharInfo, className)}>
    <div style={{ position: "absolute", bottom: "23px", right: "0px" }}>
      <Button.Group>
        <Button className={styles.MyManaBTN} onClick={() => changeMana(1)}>+</Button>
        <Button className={styles.MyManaBTN} onClick={() => changeMana(-1)}>-</Button>
      </Button.Group>
    </div>
    <div style={{ backgroundColor: "#666666", height: "11px", width: "50%", position: "absolute", bottom: "0px", right: "0px" }}>
      <div className={styles.bar} style={{ backgroundColor: "#00FFFF", width: wid + "%", height: "inherit", position: "absolute", left: "0px", bottom: "0px", textAlign: "left" }}></div>
      <p style={{ zIndex: "10000", position: "absolute", bottom: "-10px", right: "0px", color: "#FFFFFF", fontSize: "9px" }}>灵力: {charState.myMana || '0'}</p>
    </div>

  </div>
}

function MyCharInfo({
  className,
  charState,
  dispatch,
  width = 1000,
}) {
  const height = 20;
  return <div className={classNames(styles.MyCharInfo, className)}>
    <MyHealthInfo charState={charState} dispatch={dispatch} className={className} />
    <MyLevelInfo charState={charState} dispatch={dispatch} className={className} />
    <MyManaInfo charState={charState} dispatch={dispatch} className={className} />
  </div>
}

export default connect(state => ({
  charState: state.charInfo,
}))(MyCharInfo);