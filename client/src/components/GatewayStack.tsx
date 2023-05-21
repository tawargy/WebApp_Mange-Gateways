import React, {useEffect} from 'react'
import {useAppContext} from '../context/appContext'
import {GatewayType} from '../types'
import {getGatwaysApi, getGatwayByIdApi} from '../api'
import styles from './GatewayStack.module.css'

const GateWayStack = () => {
  const {
    gateways,
    setGateways,
    setGateway,
    setIsGatewayAddMode,
    setIsGatewayEditMode,
    setPeripherals,
    setError,
  } = useAppContext()

  useEffect(() => {
    const setGatewaysList = async () => {
      const res = await getGatwaysApi()
      if (!res) return

      setGateways(res.data)
    }
    setGatewaysList()
  }, [])

  const addNewGatewayHandler = () => {
    setIsGatewayAddMode(true)
  }

  const gatewayViewClickHandler = async (
    e: React.MouseEvent<HTMLDivElement>,
  ) => {
    const id = e.currentTarget.id
    setIsGatewayAddMode(false)
    setIsGatewayEditMode(false)
    const res = await getGatwayByIdApi(id)
    if (!res) return
    if (res.message) {
      setError(res.message)
      return
    }

    setGateway(res.data)
    setPeripherals(res.data.peripherals)
  }

  return (
    <div className={styles.gatewayStack}>
      <button className={styles.btnAdd} onClick={addNewGatewayHandler}>
        Add Gateway
      </button>
      {gateways &&
        gateways.map((gateway: GatewayType) => {
          return (
            <div
              key={gateway._id}
              className={styles.gatewayName}
              onClick={gatewayViewClickHandler}
              id={gateway._id}
            >
              <span className={styles.gatewaySerial}> {gateway.serial}</span>
              <span className={styles.gatewayCircle}>
                <span className={styles.gatewayLength}>
                  {' '}
                  {gateway.peripherals?.length}{' '}
                </span>
              </span>
            </div>
          )
        })}
    </div>
  )
}

export default GateWayStack
