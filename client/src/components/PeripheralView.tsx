import {useAppContext} from '../context/appContext'
import PeripheralInput from './PeripheralInput'
import PeripheralStack from './PeripheralStack'
import {addPeripheralApi} from '../api'
import {PeripheralType} from '../types'

import styles from './PeripheralView.module.css'

const PeripheralView = () => {
  const {
    peripherals,
    setPeripherals,
    gateway,
    isPerAddMode,
    setIsPerAddMode,
    setError,
  } = useAppContext()

  const addPeripheral = async (peripheral: PeripheralType) => {
    const res = await addPeripheralApi(peripheral)
    if (!res) return
    if (res.message) {
      setError(res.message)
      setTimeout(() => {
        setError('')
      }, 3000)
    }

    if (res.data) {
      const per = res.data
      if (!peripherals) return
      const p = peripherals
      p.unshift(per)

      setPeripherals(p)
      setIsPerAddMode(!isPerAddMode)
    }
  }

  return (
    <div className={styles.peripheralView}>
      <h3>Peripherals</h3>
      <>
        <button
          className={styles.btnAdd}
          onClick={() => setIsPerAddMode(!isPerAddMode)}
        >
          {isPerAddMode ? (
            <i className="fa fa-window-close" aria-hidden="true"></i>
          ) : (
            <i className="fa-solid fa-plus"></i>
          )}
        </button>
      </>
      {gateway && isPerAddMode && (
        <PeripheralInput
          addPeripheral={addPeripheral}
          peripheral={{
            uid: 0,
            vendor: '',
            status: '',
            gatewayId: '',
          }}
          gId={gateway._id}
        />
      )}
      {gateway && <PeripheralStack />}
    </div>
  )
}
export default PeripheralView
