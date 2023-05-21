import {useAppContext} from './context/appContext'
import GatewayStack from './components/GatewayStack'
import GateWayView from './components/GatewayView'
import Gateway from './components/Gateway'
import GatewayAdd from './components/GatewayAdd'
import styles from './App.module.css'

const App = () => {
  const {gateway, isGatewayAddMode, error} = useAppContext()
  const refresh = () => window.location.reload()

  return (
    <div className={styles.app}>
      {error && (
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      )}
      <h1 onClick={refresh}>Gateway Manger</h1>

      <div className={styles.appView} >
        <GatewayStack />
        <GateWayView>
          {isGatewayAddMode ? <GatewayAdd /> : gateway && <Gateway />}
        </GateWayView>
      </div>
    </div>
  )
}

export default App
