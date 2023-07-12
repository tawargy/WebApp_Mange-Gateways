import { useAppContext } from '../../context/appContext';
import api from '../../Api/api';
import { GatewayType, gatewayUpdate } from '../../types';
import GatewayForm from './GatewayForm';
import PeripheralWrapper from '../Peripheral/PeripheralWrapper';

import styles from './Gateway.module.css';

function Gateway() {
  const {
    gateway,
    gateways,
    setGateway,
    setGateways,
    setPeripherals,
    isGatewayEditMode,
    setIsGatewayEditMode,
    addError,
  } = useAppContext();

  const editGateway = async (gatewayEdit: gatewayUpdate) => {
    if (gatewayEdit) {
      const res = await api.updateGatway(gatewayEdit);
      if (res) {
        if (res?.message) {
          addError(res.message);
          return;
        }
        setGateway(res.data);
        if (gateways) {
          const gatewayList = gateways.filter(
            /* eslint no-underscore-dangle: 0 */
            (g: GatewayType) => g._id !== gatewayEdit._id
          );
          gatewayList.unshift(res.data);
          setGateways(gatewayList);
        }
        setIsGatewayEditMode(false);
        setPeripherals(res.data.peripherals);
      }
    }
  };

  const deleteGateway = async () => {
    if (gateway) {
      if (gateway._id) {
        await api.deleteGatway(gateway._id);

        if (gateways) {
          const gatewayList = gateways.filter(
            (g: GatewayType) => g._id !== gateway._id
          );
          setGateways(gatewayList);
          setGateway(undefined);
          setPeripherals(undefined);
        }
      }
    }
  };

  return (
    <div className={styles.gateway}>
      {isGatewayEditMode ? (
        <GatewayForm isAddMode={false} editGateway={editGateway} />
      ) : (
        gateway && (
          <>
            <h3>Gateway</h3>
            <div className={styles.gatewayController}>
              <button
                type="button"
                className={styles.btnEdit}
                onClick={() => setIsGatewayEditMode(true)}
              >
                <i className="fas fa-edit" />
              </button>
              <button
                type="button"
                className={styles.btnDelete}
                onClick={deleteGateway}
              >
                <i className="fa fa-window-close" aria-hidden="true" />
              </button>
            </div>
            <div>
              <span>Serial : {gateway.serial}</span>
              <span>Name : {gateway.name}</span>
              <span>Ip : {gateway.ip}</span>
            </div>

            <PeripheralWrapper />
          </>
        )
      )}
    </div>
  );
}

export default Gateway;
