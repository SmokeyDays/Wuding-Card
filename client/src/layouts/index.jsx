import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';

import styles from './index.less';

function BasicLayout(props) {
  return (
    <ConfigProvider locale={zhCN}>
      <div className={styles.BasicLayout}>
        
        {props.children}
      </div>
    </ConfigProvider>
  );
}

export default BasicLayout;
