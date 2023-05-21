import {useAppContext} from '../context/appContext'
import Peripheral from './Peripheral'
import styles from './PeripheralStack.module.css'

const PeripheralStack = () => {
  const {peripherals, gateway} = useAppContext()

  return (

        <table className={styles.peripheralTable}>
        <thead>
          <tr>
            <th>uid</th>
            <th>vendor</th>
            <th>status</th>
          </tr>
        </thead>

      {peripherals &&
        gateway &&
        peripherals.map((per) => (
          <Peripheral key={per._id} peripheral={per} gId={gateway._id} />
        ))}
   </table>

  )
}

export default PeripheralStack
