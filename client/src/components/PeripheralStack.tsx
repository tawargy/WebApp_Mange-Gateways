import {useEffect, useState} from 'react'
import {addPeripheral} from '../api'
import {GatewayType, PeripheralType} from '../types'
import Peripheral from './Peripheral'

import styles from './PeripheralStack.module.css'

interface PropTypes {
  gateway: GatewayType
}

const PeripheralStack = (props: PropTypes) => {
  const [peripherals, setPeripherals] = useState(props.gateway.peripherals)
  const [uid, setUid] = useState(0)
  const [vendor, setVendor] = useState('')
  const [status, setSatus] = useState('')
  const [addMode, setAddMode] = useState(false)
  const addHandler = () => {
    setAddMode(!addMode)
  }
  useEffect(()=>{
    setPeripherals(props.gateway.peripherals)
  },[props.gateway])
  const addPeripheralHandler = async () => {
    const res = await addPeripheral({
      uid,
      vendor,
      status,
      gatewayId: props.gateway._id,
    })
    if (!res) return
    console.log(res)
    const p = peripherals
    p.unshift(res)
    setPeripherals(p)
    setUid(0)
    setVendor('')
    setSatus('')
    setAddMode(false)
  }
  const deleteFromStack = (id: string) => {
    const per = peripherals?.filter((p: PeripheralType) => p._id !== id)
    setPeripherals(per)
  }
  return (
    <div className={styles.peripherals}>
      {peripherals&& <h4>Peripheral</h4>}
      <button className={styles.btnAddMain} onClick={addHandler}>
        <i className="fa-solid fa-plus"></i>
      </button>
      {addMode && (
        <>
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
          <button className={styles.btnAdd} onClick={addPeripheralHandler}>
            Add
          </button>
        </>
      )}
      {peripherals.map((p) => {
        return (
          <Peripheral
            peripheral={p}
            key={p._id}
            deleteFromStack={deleteFromStack}
          />
        )
      })}
    </div>
  )
}
export default PeripheralStack
