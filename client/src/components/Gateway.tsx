import {useAppContext} from '../context/appContext'
import {updateGatwayApi, deleteGatwayApi} from '../api'
import {GatewayType} from '../types'
import GatewayInput from './GatewayInput'
import styles from './Gateway.module.css'
import PeripheralView from './PeripheralView'

type Gateway = Pick<GatewayType, 'serial' | 'name' | 'ip' | '_id'>

const Gateway = () => {
  const {
    gateway,
    gateways,
    setGateway,
    setGateways,
    setPeripherals,
    isGatewayEditMode,
    setIsGatewayEditMode,
    setError,
  } = useAppContext()

  const editGateway = async (gateway: Gateway) => {
    if (!gateway) return
    const res = await updateGatwayApi(gateway)
    if (!res) return
    if (res?.message) {
      setError(res.message)
      setTimeout(() => {
        setError('')
      }, 3000)
      return
    }
    setGateway(res.data)
    if (gateways) {
      const gArr = gateways.filter((gg: GatewayType) => gg._id !== gateway._id)
      gArr.unshift(res.data)
      setGateways(gArr)
    }
    setPeripherals(res.data.peripherals)
  }

  const deleteGateway = async () => {
    if (!gateway?._id) return
    await deleteGatwayApi(gateway._id)

    if (gateways) {
      const gArr = gateways.filter((gg: GatewayType) => gg._id !== gateway._id)
      setGateways(gArr)
      setGateway(undefined)
      setPeripherals(undefined)
    }
  }

  return (
    <div className={styles.gateway}>
   
      {isGatewayEditMode ? (
        <GatewayInput isAddMode={false} editGateway={editGateway} />
      ) : (
        gateway && (
          <>
            <table className={styles.gatewayTable}>
              <caption>Gateway</caption>
              <thead>
                <tr>
                  <th>Serial</th>
                  <th>Name</th>
                  <th>Ip</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{gateway.serial}</td>
                  <td>{gateway.name}</td>
                  <td>{gateway.ip}</td>
                  <td>
                    <div className={styles.gatewayController}>
                      <button
                        className={styles.btnEdit}
                        onClick={() => setIsGatewayEditMode(true)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className={styles.btnDelete}
                        onClick={deleteGateway}
                      >
                        <i
                          className="fa fa-window-close"
                          aria-hidden="true"
                        ></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <PeripheralView />
          </>
        )
      )}
    </div>
  )
}

export default Gateway
