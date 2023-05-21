import GatewayInput from './GatewayInput'
import {GatewayType} from '../types'
import {addGatewayApi} from '../api'

import styles from './GatewayAdd.module.css'
import {useAppContext} from '../context/appContext'

type Gateway = Pick<GatewayType, 'serial' | 'name' | 'ip'>

const GatewayAdd = () => {
  const {setError,setGateway,setPeripherals, gateways, setGateways, setIsGatewayAddMode} = useAppContext()

  const addGateway = async (gateway: Gateway) => {
    const res = await addGatewayApi(gateway)
    if (!res) return
    if (res.message) {
      setError(res.message)
      setTimeout(() => {
        setError('')
      }, 3000)
      return
    }

    if (gateways) {
      const g = gateways
      g.unshift(res.data)
      setGateways(g)
    } else {
      setGateways([res.data])
    }
    setIsGatewayAddMode(false)
    setGateway(res.data)
    setPeripherals(res.data.peripherals)
  }

  return (
    <div className={styles.gatewayAdd}>
      <button
        className={styles.btnClose}
        onClick={() => setIsGatewayAddMode(false)}
      >
        <i className="fa fa-window-close" aria-hidden="true"></i>
      </button>

      <GatewayInput isAddMode={true} addGateway={addGateway} />
    </div>
  )
}
export default GatewayAdd
