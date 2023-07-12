import React, { useState } from 'react';
import { useAppContext } from '../../context/appContext';
import { PeripheralType, peripheralUpdate } from '../../types';
import api from '../../Api/api';
import PeripheralEdit from './PeripheralEdit';
import styles from './Peripheral.module.css';

/* eslint no-underscore-dangle: 0 */

type Props = {
  peripheral: PeripheralType;
  gatewayId: string | undefined;
};
function Peripheral(props: Props) {
  const { peripheral, gatewayId } = props;
  const {
    isPerEditMode,
    setIsPerEditMode,
    gateway,
    peripherals,
    setPeripherals,
    addError,
  } = useAppContext();

  const [id, setId] = useState('');
  const editHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isPerEditMode) {
      return;
    }

    const perId = e.currentTarget.getAttribute('id')!;
    setId(perId);
    setIsPerEditMode(true);
  };

  const peripheralEdit = async (peripheralArg: peripheralUpdate) => {
    if (!gatewayId) return;

    const res = await api.updatePeripheral(peripheralArg);
    if (res) {
      if (res.message) {
        addError(res.message);
        return;
      }
      const per = peripherals?.filter((p) => p._id !== res.data._id);
      const p = per;
      p?.unshift(res.data);
      setPeripherals(p);
      setIsPerEditMode(false);
      setId('');
    }
  };
  const deletePeripheral = async () => {
    if (peripheral?._id) {
      await api.deletePeripheral(peripheral._id);
      if (gateway) {
        const per = peripherals?.filter(
          (p: PeripheralType) => p._id !== peripheral._id
        );

        setPeripherals(per);
      }
    }
  };
  return (
    <tbody>
      {isPerEditMode && id === peripheral._id && (
        <PeripheralEdit
          peripheral={peripheral}
          peripheralEdit={peripheralEdit}
        />
      )}

      {id !== peripheral._id && (
        <tr className={styles.trView}>
          <td>{peripheral.uid}</td>
          <td>{peripheral.vendor}</td>
          <td>{peripheral.status}</td>
          <td>
            <div className={styles.peripheralController}>
              <button
                type="button"
                id={peripheral._id}
                className={styles.btnEdit}
                onClick={editHandler}
              >
                <i className="fas fa-edit" />
              </button>
              <button
                type="button"
                className={styles.btnDelete}
                onClick={deletePeripheral}
              >
                <i className="fa fa-window-close" aria-hidden="true" />
              </button>
            </div>
          </td>
        </tr>
      )}
    </tbody>
  );
}

export default Peripheral;
