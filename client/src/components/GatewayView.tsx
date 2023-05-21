import type {ReactNode} from 'react'
import styles from './GatewayView.module.css'

const GateWayStack = ({children}: {children: ReactNode}) => {
  return <div className={styles.gatewayInfo}>{children}</div>
}

export default GateWayStack
