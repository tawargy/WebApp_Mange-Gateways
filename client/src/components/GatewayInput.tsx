import  { useState} from 'react'
import {GatewayType} from '../types'
import {addGateway, updateGatway} from '../api'

import styles from './GatewayInput.module.css'

interface ProTypes {
  gateway: GatewayType | undefined
  addMode: boolean
  addToStack?: (gateway: GatewayType) => void
  updateStack?: (gateway: GatewayType) => void
}

const GatewayInput = (props: ProTypes) => {
  let gatewaySerial = props.gateway?.serial || '',
    gatewayName = props.gateway?.name || '',
    gatewayIp = props.gateway?.ip || ''

  const [serial, setSerial] = useState(gatewaySerial)
  const [name, setName] = useState(gatewayName)
  const [ip, setIp] = useState(gatewayIp)

  const addHandler = async () => {
    try {
      const res = await addGateway({serial, name, ip})
      if (!res || !props.addToStack) return
      props.addToStack(res)
      setSerial('')
      setIp('')
      setName('')
    } catch (err) {
      console.log(err)
    }
  }
  const updateHandler = async () => {
    try {
      if (!props.gateway?._id) return
      const res = await updateGatway({
        serial,
        ip,
        name,
        _id: props.gateway?._id,
      })
      if (!res || !props.updateStack) return
      props.updateStack(res)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="serial">serial</label>
          <input
            name="serial"
            value={serial}
            onChange={(e) => setSerial(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="name">name</label>
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="ip">ip</label>
          <input name="ip" value={ip} onChange={(e) => setIp(e.target.value)} />
        </div>
      </div>
      {props.addMode ? (
        <button className={styles.btnAdd} onClick={addHandler}>
          Add
        </button>
      ) : (
        <button className={styles.btnEdit} onClick={updateHandler}>
          Edit
        </button>
      )}
    </>
  )
}

export default GatewayInput
