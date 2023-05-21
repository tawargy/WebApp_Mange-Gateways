import React, {useState} from 'react'
import {useAppContext} from '../context/appContext'
import {PeripheralType} from '../types'
import {updatePeripheralApi, deletePeripheralApi} from '../api'
import styles from './Peripheral.module.css'

type Peripheral = Pick<PeripheralType, 'uid' | 'vendor' | 'status' | '_id'>
type Props = {
  peripheral: PeripheralType
  gId: string | undefined
}

const Peripheral = (props: Props) => {
  const {
    isPerEditMode,
    setIsPerEditMode,
    gateway,
    peripherals,
    setPeripherals,
    setError,
  } = useAppContext()

  const [id, setId] = useState('')
  const [uid, setUid] = useState(props.peripheral.uid)
  const [vendor, setVendor] = useState(props.peripheral.vendor)
  const [status, setStatus] = useState(props.peripheral.status)

 
  const deletePeripheral = async () => {
    if (!props?.peripheral?._id) return
    await deletePeripheralApi(props.peripheral._id)
    if (!gateway) return

    const per = peripherals?.filter(
      (p: PeripheralType) => p._id !== props.peripheral._id,
    )
    console.log(per)
    let p = peripherals
    p = per
    console.log(p)
    setPeripherals(p)
  }
  const editHandler = (e: React.MouseEvent<HTMLButtonElement>) => {

    if (isPerEditMode) {
      return
    }

    const perId = e.currentTarget.getAttribute('id')!
    setId(perId)
    setIsPerEditMode(true)
  }

  const updateHandler = async () => {
    if (!props.gId) return
    const peripheral: PeripheralType = {
      _id: props.peripheral._id,
      uid,
      vendor,
      status,
      gatewayId: props.gId,
    }
    const res = await updatePeripheralApi(peripheral)
    if (!res) return
    if (res.message) {
      setError(res.message)
      setTimeout(() => {
        setError('')
      }, 3000)
    }
    const per = peripherals?.filter((p) => p._id !== res.data._id)
    const p = per
    p?.unshift(res.data)
    setPeripherals(p)
    setIsPerEditMode(false)
    setId('')
  }
  return (
    <tbody>
      {isPerEditMode && id === props.peripheral._id && (
        <tr>
          <td>
            <input
              type="number"
              name="uid"
              value={uid}
              onChange={(e) => setUid(+e.target.value)}
            />
          </td>
          <td>
            {' '}
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
              <button
                id={props.peripheral._id}
                className={styles.btnEdit}
                onClick={editHandler}
              >
                <i className="fas fa-edit"></i>
              </button>
              <button className={styles.btnAdd} onClick={updateHandler}>
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          </td>
        </tr>
      )}
      {id !== props.peripheral._id && (
        <tr className={styles.trView}>
          <td>{props.peripheral.uid}</td>
          <td>{props.peripheral.vendor}</td>
          <td>{props.peripheral.status}</td>
          <td>
            <div className={styles.peripheralController}>
              <button
                id={props.peripheral._id}
                className={styles.btnEdit}
                onClick={editHandler}
              >
                <i className="fas fa-edit"></i>
              </button>
              <button className={styles.btnDelete} onClick={deletePeripheral}>
                <i className="fa fa-window-close" aria-hidden="true"></i>
              </button>
            </div>
          </td>
        </tr>
      )}
    </tbody>
  )
}

export default Peripheral
