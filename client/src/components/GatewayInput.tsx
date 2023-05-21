import {useState} from 'react'
import {useAppContext} from '../context/appContext'
import {GatewayType} from '../types'
import styles from './GatewayInput.module.css'

type Gateway = Pick<GatewayType, 'serial' | 'name' | 'ip'|'_id'>
type Props = {

  isAddMode: boolean
  addGateway?: (gateway: Gateway) => Promise<void>
  editGateway?: (gateway: Gateway) => Promise<void>
}
const GatewayInput = (props: Props) => {
  const {gateway,setIsGatewayEditMode} = useAppContext()
  const [serial, setSerial] = useState(gateway?.serial)
  const [name, setName] = useState(gateway?.name)
  const [ip, setIp] = useState(gateway?.ip)



  const addGatewayHandler = () => {
    if (!serial || !name || !ip) return
    if (!props.addGateway) return
    props.addGateway({name, serial, ip})
    
  }
  const editGatewayHandler = () => {
    if (!serial || !name || !ip || !gateway?._id) return
    if (!props.editGateway) return
    props.editGateway({serial, name, ip,_id:gateway?._id})
    setIsGatewayEditMode(false)
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
            <input
              name="ip"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
            />
          </div>
        </div>
        {props.isAddMode ? (
          <button className={styles.btnAdd} onClick={addGatewayHandler}>
            Add
          </button>
        ) : (
          <button className={styles.btnEdit} onClick={editGatewayHandler}>
            Edit
          </button>
        )}
      </>
    )

    
}

export default GatewayInput
