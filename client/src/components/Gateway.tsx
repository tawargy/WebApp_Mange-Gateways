import {useEffect, useState} from 'react'
import {GatewayType} from '../types'
import {deleteGatway} from '../api'
import GatewayInput from './GatewayInput'
import styles from './Gateway.module.css'

interface ProTypes {
  gateway: GatewayType
  editMode: boolean
  updateStack: (gateway: GatewayType) => void
  deleteFromStack: (id: string) => void
}
function Gateway(props: ProTypes) {
  const [gateway, setGateway] = useState<GatewayType | null>(props.gateway)
  const [editMode, setEditMode] = useState(props.editMode)

  useEffect(() => {
    setGateway(props.gateway)
    setEditMode(props.editMode)
  }, [props.gateway, props.editMode])

  const deleteHandler = async () => {
    try {
      if (!gateway?._id) return
      await deleteGatway(gateway?._id)

      props.deleteFromStack(gateway?._id)
      setGateway(null)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={styles.containerView}>
      {gateway && (
        <>
          <div className={styles.controller}>
            <button
              className={styles.btnEdit}
              onClick={() => setEditMode(!editMode)}
            >
              <i className="fas fa-edit"></i>
            </button>
            <button className={styles.btnDelete} onClick={deleteHandler}>
              <i className="fa fa-window-close" aria-hidden="true"></i>
            </button>
          </div>
        </>
      )}
      {editMode
        ? gateway && (
            <GatewayInput
              gateway={gateway}
              addMode={false}
              updateStack={props.updateStack}
            />
          )
        : gateway && (
            <>
              <h3>Gateway</h3>
              <div className={styles.gatewayView}>
                <span>Serial : {gateway.serial}</span>
                <span>Name : {gateway.name}</span>
                <span>Ip : {gateway.ip}</span>
              </div>
            </>
          )}
    </div>
  )
}

export default Gateway
