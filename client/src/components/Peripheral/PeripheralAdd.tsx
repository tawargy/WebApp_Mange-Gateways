import { useState } from 'react';
import { PeripheralType } from '../../types';
import styles from './PeripheralAdd.module.css';

type Props = {
  gatewayId: string | undefined;
  // eslint-disable-next-line
  addPeripheral?: (peripheral: PeripheralType) => Promise<void>;
};

function PeripheralAdd(props: Props) {
  const { gatewayId, addPeripheral } = props;
  const [uid, setUid] = useState(0);
  const [vendor, setVendor] = useState('');
  const [status, setSatus] = useState('');

  const addPerHandler = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!uid || !vendor || !status || !gatewayId || !addPeripheral) return;
    const p: PeripheralType = {
      uid,
      vendor,
      status,
      gatewayId,
    };
    addPeripheral(p);
  };

  return (
    <form className={styles.peripheralform}>
      <div className={styles.formGroup}>
        <label htmlFor="uid">
          uid
          <input
            name="uid"
            type="number"
            value={uid}
            onChange={(e) => setUid(+e.target.value)}
          />
        </label>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="vendor">
          vendor
          <input
            name="vendor"
            value={vendor}
            onChange={(e) => setVendor(e.target.value)}
          />
        </label>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="status">
          status
          <input
            name="status"
            value={status}
            onChange={(e) => setSatus(e.target.value)}
          />
        </label>
      </div>
      <button type="button" className={styles.btnAdd} onClick={addPerHandler}>
        Add
      </button>
    </form>
  );
}

export default PeripheralAdd;
