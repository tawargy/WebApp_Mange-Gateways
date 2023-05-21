import {useState} from 'react'
import {PeripheralType} from '../types'
import styles from './PeripheralInput.module.css'

type Props = {
  peripheral: PeripheralType
  addPeripheral?: (peripheral: PeripheralType) => Promise<void>
  gId: string | undefined
}

const PeripheralInput = (props: Props) => {
  const [uid, setUid] = useState(props.peripheral.uid)
  const [vendor, setVendor] = useState(props.peripheral.vendor)
  const [status, setSatus] = useState(props.peripheral.status)

  const addPerHandler = () => {
    if (!uid || !vendor || !status || !props.gId || !props.addPeripheral) return
    const p: PeripheralType = {
      uid,
      vendor,
      status,
      gatewayId: props.gId,
    }
    props.addPeripheral(p)
  }

  return (
    <div className={styles.peripheralForm}>
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="uid">uid</label>
          <input
            name="uid"
            type="number"
            value={uid}
            onChange={(e) => setUid(+e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="vendor">vendor</label>
          <input
            name="vendor"
            value={vendor}
            onChange={(e) => setVendor(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="status">status</label>
          <input
            name="status"
            value={status}
            onChange={(e) => setSatus(e.target.value)}
          />
        </div>
      </div>

      <button className={styles.btnAdd} onClick={addPerHandler}>
        Add
      </button>
    </div>
  )
}

export default PeripheralInput
