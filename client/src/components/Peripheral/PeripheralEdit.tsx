import { useState } from 'react';
import { PeripheralType } from '../../types';

import styles from './PeripheralEdit.module.css';

type Peripheral = Pick<PeripheralType, 'uid' | 'vendor' | 'status' | '_id'>;

type PeripheralEditProps = {
  peripheral: PeripheralType;
  peripheralEdit: (per: Peripheral) => void;
};
function PeripheralEdit(props: PeripheralEditProps) {
  const { peripheral, peripheralEdit } = props;

  const [uid, setUid] = useState(peripheral.uid);
  const [vendor, setVendor] = useState(peripheral.vendor);
  const [status, setStatus] = useState(peripheral.status);

  const editHandler = () => {
    /* eslint no-underscore-dangle: 0 */
    const ppp = { uid, vendor, status, _id: peripheral._id };
    peripheralEdit(ppp);
  };
  return (
    <tr className={styles.peripheralRowEdit}>
      <td>
        <input
          type="number"
          name="uid"
          value={uid}
          onChange={(e) => setUid(+e.target.value)}
        />
      </td>
      <td>
        <input
          name="vendor"
          value={vendor}
          onChange={(e) => setVendor(e.target.value)}
        />
      </td>
      <td>
        {' '}
        <input
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
      </td>
      <td>
        <div className={styles.peripheralController}>
          <button type="button" className={styles.btnAdd} onClick={editHandler}>
            <i className="fa-solid fa-plus" />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default PeripheralEdit;
