import { useAppContext } from '../../context/appContext';
import Peripheral from './Peripheral';
import styles from './PeripheralList.module.css';

function PeripheralList() {
  const { peripherals, gateway } = useAppContext();

  /* eslint no-underscore-dangle: 0 */
  return (
    <table className={styles.peripheralTable}>
      <thead>
        <tr>
          <th>uid</th>
          <th>vendor</th>
          <th>status</th>
          <th> -- </th>
        </tr>
      </thead>

      {peripherals &&
        gateway &&
        peripherals.map((per) => (
          <Peripheral key={per._id} peripheral={per} gatewayId={gateway._id} />
        ))}
    </table>
  );
}

export default PeripheralList;
