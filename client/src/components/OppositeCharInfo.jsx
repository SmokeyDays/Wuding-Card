/* eslint-disable */
import { connect } from 'dva';
import classNames from 'classnames';
import styles from './OppositeCharInfo.less';

function OppositeHealthInfo({
  className,
  charState,
}) {
  const wid = charState.oppositeHealth * 10;
  return <div className={classNames(styles.OppositeCharInfo, className)}>
    <div style={{ backgroundColor: "#666666", height: 22, width: "50%", position: "absolute", bottom: "0px", left: 0 }}>
      <div style={{ backgroundColor: "#FF0000", width: wid + "%", height: "inherit", position: "absolute", right: 0, bottom: 0, textAlign: "right" }} className="iconfont icon-fire"></div>
      <p style={{ zIndex: 10000, position: "absolute", color: "#FFFFFF" }}>命火: {charState.oppositeHealth || '0'}</p>
    </div>

  </div>
}

function OppositeLevelInfo({
  className,
  charState,
}) {
  const wid = charState.oppositeLevel * 10;
  return <div className={classNames(styles.OppositeCharInfo, className)}>
    <div style={{ backgroundColor: "#666666", height: 11, width: "50%", position: "absolute", top: 0, right: 0 }}>
      <div style={{ backgroundColor: "#0000C6", width: wid + "%", height: "inherit", position: "absolute", left: "0px", bottom: 0, textAlign: "left" }}></div>
      <p style={{ zIndex: 10000, position: "absolute", bottom: -10, right: 0, color: "#FFFFFF", fontSize: "9px" }}>修为: {charState.oppositeLevel || '0'}</p>
    </div>

  </div>
}

function OppositeManaInfo({
  className,
  charState,
}) {
  const wid = charState.oppositeMana * 10;
  return <div className={classNames(styles.OppositeCharInfo, className)}>
    <div style={{ backgroundColor: "#666666", height: 11, width: "50%", position: "absolute", bottom: 0, right: 0 }}>
      <div style={{ backgroundColor: "#00FFFF", width: wid + "%", height: "inherit", position: "absolute", left: 0, bottom: 0, textAlign: "left" }}></div>
      <p style={{ zIndex: "10000", position: "absolute", bottom: -10, right: 0, color: "#FFFFFF", fontSize: 9 }}>灵力: {charState.oppositeMana || '0'}</p>
    </div>

  </div>
}

function OppositeCharInfo({
  className,
  charState,
  width = 1000,
}) {
  const height = 20;
  return <div className={classNames(styles.OppositeCharInfo, className)}>
    <OppositeHealthInfo charState={charState} className={className} />
    <OppositeLevelInfo charState={charState} className={className} />
    <OppositeManaInfo charState={charState} className={className} />
  </div>
}

export default connect(state => ({
  charState: state.charInfo,
}))(OppositeCharInfo);