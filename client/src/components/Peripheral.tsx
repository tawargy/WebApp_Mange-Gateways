import {useEffect, useState} from 'react'
import {GatewayType, PeripheralType} from '../types'
import {deletePeripheral, updatePeripheral} from '../api'
import styles from './Peripheral.module.css'

interface PropTypes {
  peripheral: PeripheralType
  deleteFromStack: (id: string) => void
}

const Peripheral = (props: PropTypes) => {
  const [uid, setUid] = useState(props.peripheral.uid)
  const [vendor, setVendor] = useState(props.peripheral.vendor)
  const [status, setSatus] = useState(props.peripheral.status)
  const [editMode, setEditMode] = useState(false)

  const editModeHandler = () => {
    setEditMode(!editMode)
  }
  const updateHandler = async () => {
    const res = await updatePeripheral({
      _id: props.peripheral._id,
      uid,
      vendor,
      status,
    })
    if (!res) return

    setSatus(res.status)
    setVendor(res.vendor)
    setUid(res.uid)
    setEditMode(false)
  }

  const deleteHandler = async () => {
    await deletePeripheral(props.peripheral._id)

    props.deleteFromStack(props.peripheral._id)
  }
  return (
    <div className={styles.peripheralComponent}>
      <div className={styles.peripheralController}>
        <button className={styles.btnEdit} onClick={editModeHandler}>
          {' '}
          <i className="fas fa-edit"></i>
        </button>
        <button className={styles.btnDelete} onClick={deleteHandler}>
          <i className="fa fa-window-close" aria-hidden="true"></i>
        </button>
      </div>
      {editMode ? (
        <div className={styles.peripheralEdit}>
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
          <button className={styles.btnEdit} onClick={updateHandler}>
            Edit
          </button>
        </div>
      ) : (
        <div className={styles.peripheralView}>
          <span>uid : {uid}</span>
          <span>vandor : {vendor}</span>
          <span>status : {status}</span>
        </div>
      )}
    </div>
  )
}

export default Peripheral
