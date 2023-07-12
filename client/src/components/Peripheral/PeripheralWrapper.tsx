import { useAppContext } from '../../context/appContext';
import PeripheralAdd from './PeripheralAdd';
import PeripheralList from './PeripheralList';
import api from '../../Api/api';
import { PeripheralType } from '../../types';

import styles from './PeripheralWrapper.module.css';

/* eslint no-underscore-dangle: 0 */
function PeripheralWrapper() {
  const {
    peripherals,
    setPeripherals,
    gateway,
    isPerAddMode,
    setIsPerAddMode,
    addError,
  } = useAppContext();

  const addPeripheral = async (peripheral: PeripheralType) => {
    const res = await api.addPeripheral(peripheral);
    if (res) {
      if (res.message) {
        addError(res.message);
      }

      if (res.data) {
        const per = res.data;
        if (!peripherals) return;
        const p = peripherals;
        p.unshift(per);

        setPeripherals(p);
        setIsPerAddMode(!isPerAddMode);
      }
    }
  };

  return (
    <div className={styles.peripheralView}>
      <h3>Peripherals</h3>

      <button
        type="button"
        className={styles.btnAdd}
        onClick={() => setIsPerAddMode(!isPerAddMode)}
      >
        {isPerAddMode ? (
          <i className="fa fa-window-close" aria-hidden="true" />
        ) : (
          <i className="fa-solid fa-plus" />
        )}
      </button>

      {gateway && isPerAddMode && (
        <PeripheralAdd addPeripheral={addPeripheral} gatewayId={gateway._id} />
      )}
      {gateway && <PeripheralList />}
    </div>
  );
}
export default PeripheralWrapper;
