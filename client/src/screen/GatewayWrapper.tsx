import GatewayAdd from '../components/Gateway/GatewayAdd';
import Gateway from '../components/Gateway/Gateway';
import { useAppContext } from '../context/appContext';

import styles from './GatewayWrapper.module.css';

function GatewayWrapper() {
  const { isGatewayAddMode } = useAppContext();

  return (
    <div className={styles.gatewayInfo}>
      {isGatewayAddMode ? <GatewayAdd /> : <Gateway />}
    </div>
  );
}

export default GatewayWrapper;
