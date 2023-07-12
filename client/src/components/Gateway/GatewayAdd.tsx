import GatewayForm from './GatewayForm';
import { gatewayAdd } from '../../types';
import api from '../../Api/api';
import { useAppContext } from '../../context/appContext';

import styles from './GatewayAdd.module.css';

function GatewayAdd() {
  const {
    addError,
    setGateway,
    setPeripherals,
    gateways,
    setGateways,
    setIsGatewayAddMode,
  } = useAppContext();

  const addGateway = async (gateway: gatewayAdd) => {
    const res = await api.addGateway(gateway);
    if (res) {
      if (res.message) {
        addError(res.message);
        return;
      }

      if (gateways) {
        const g = gateways;
        g.unshift(res.data);
        setGateways(g);
      } else {
        setGateways([res.data]);
      }
      setIsGatewayAddMode(false);
      setGateway(res.data);
      setPeripherals(res.data.peripherals);
    }
  };

  return (
    <div className={styles.gatewayAdd}>
      <button
        type="button"
        className={styles.btnClose}
        onClick={() => setIsGatewayAddMode(false)}
      >
        <i className="fa fa-window-close" aria-hidden="true" />
      </button>

      <GatewayForm isAddMode addGateway={addGateway} />
    </div>
  );
}
export default GatewayAdd;
