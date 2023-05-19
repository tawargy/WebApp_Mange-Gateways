import React, {useState, useEffect} from 'react'
import {getGatways, getGatwayById} from '../api'
import {GatewayType} from '../types'
import Gateway from './Gateway'
import GatewayInput from './GatewayInput'

import PeripheralStack from './PeripheralStack'
import styles from './GatewayStack.module.css'

function GatewayStack() {
  const [gateways, setGateways] = useState<GatewayType[]>()
  const [gateway, setGateway] = useState<GatewayType>()
  const [viewMode, setViewMode] = useState(true)
  const [addMode, setAddMode] = useState(true)
  const [editMode, setEditMode] = useState(true)
  useEffect(() => {
    const setDate = async () => {
      try {
        const data = await getGatways()
        if (!data) return

        setGateways(data)
      } catch (err) {
        if(err instanceof Error){
        alert(err.message)
        }
      }
    }
    setDate()
  }, [])

  const addHandler = () => {
    setViewMode(false)
    setAddMode(true)
    setEditMode(true)
  }

  const gatewayClickHandler = async (e: React.MouseEvent<HTMLDivElement>) => {
    const id = e.currentTarget.id
    const res = await getGatwayById(id)
    setGateway(res)
    setViewMode(true)
    setEditMode(false)
  }

  const addToStack = (gateway: GatewayType) => {
    if (gateways) {
      const g = gateways
      g.unshift(gateway)
      setGateways(g)
    } else {
      setGateways([gateway])
    }
    setGateway(gateway)
    setViewMode(true)
    setEditMode(false)
  }
  const updateStack = (gateway: GatewayType) => {
    if (gateways) {
      const g = gateways.filter((gg: GatewayType) => gg._id !== gateway._id)
      g.unshift(gateway)
      setGateways(g)
    }
    console.log('ggg', gateway)
    setGateway(gateway)
    setViewMode(true)
    setEditMode(false)
    setAddMode(false)
  }
  const deleteFromStack = (id: string) => {
    const g = gateways?.filter((gat: GatewayType) => gat._id !== id)
    setGateways(g)
  }

  return (
    <div className={styles.gatewayContainer}>
      <div className={styles.gatewayStack}>
        <button className={styles.btnAdd} onClick={addHandler}>
          Add
        </button>
        {gateways &&
          gateways.map((gateway: GatewayType) => {
            return (
              <div
                key={gateway._id}
                className={styles.gatewayName}
                onClick={gatewayClickHandler}
                id={gateway._id}
              >
                <span> {gateway.serial}</span>
                <span className={styles.gatewayLength}>
                  {gateway.peripherals?.length}
                </span>
              </div>
            )
          })}
      </div>
      <div className={styles.gatewayInfo}>
        {viewMode ? (
          gateway && (
            <>
              <Gateway
                gateway={gateway}
                editMode={editMode}
                updateStack={updateStack}
                deleteFromStack={deleteFromStack}
              />
              <PeripheralStack gateway={gateway} />
            </>
          )
        ) : (
          <GatewayInput
            gateway={undefined}
            addMode={addMode}
            addToStack={addToStack}
          />
        )}
      </div>
    </div>
  )
}

export default GatewayStack
