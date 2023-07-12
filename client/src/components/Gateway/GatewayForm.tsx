import { useEffect, useState } from 'react';
import { useAppContext } from '../../context/appContext';
import { gatewayUpdate, gatewayAdd } from '../../types';
import styles from './GatewayForm.module.css';

type GatewayFormProps = {
  isAddMode: boolean;
  // eslint-disable-next-line
  addGateway?: (gateway: gatewayAdd) => Promise<void>;
  // eslint-disable-next-line
  editGateway?: (gateway: gatewayUpdate) => Promise<void>;
};

function GatewayForm(props: GatewayFormProps) {
  const { isAddMode, addGateway, editGateway } = props;
  const { gateway } = useAppContext();

  const [serial, setSerial] = useState(gateway?.serial || '');
  const [name, setName] = useState(gateway?.name || '');
  const [ip, setIp] = useState(gateway?.ip || '');

  useEffect(() => {
    if (isAddMode) {
      setSerial('');
      setName('');
      setIp('');
    }
  }, []);

  const addGatewayHandler = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!serial || !name || !ip) return;
    if (addGateway) {
      addGateway({ name, serial, ip });
    }
  };
  /* eslint no-underscore-dangle: 0 */
  const editGatewayHandler = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!serial || !name || !ip || !gateway?._id) return;
    if (editGateway) {
      editGateway({ serial, name, ip, _id: gateway?._id });
    }
  };

  return (
    <form className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="serial">
          Serial
          <input
            id="serial"
            value={serial}
            onChange={(e) => setSerial(e.target.value)}
          />
        </label>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="name">
          Name
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="ip">
          Ip
          <input id="ip" value={ip} onChange={(e) => setIp(e.target.value)} />
        </label>
      </div>
      {isAddMode ? (
        <button
          type="button"
          className={styles.btnAdd}
          onClick={addGatewayHandler}
        >
          Add
        </button>
      ) : (
        <button
          type="button"
          className={styles.btnEdit}
          onClick={editGatewayHandler}
        >
          Edit
        </button>
      )}
    </form>
  );
}

export default GatewayForm;
