import React, {createContext, useContext, useState} from 'react'
import {GatewayType, PeripheralType} from '../types'

interface State {
  gateways: GatewayType[] | undefined
  setGateways: React.Dispatch<React.SetStateAction<GatewayType[] | undefined>>
  gateway: GatewayType | undefined
  setGateway: React.Dispatch<React.SetStateAction<GatewayType | undefined>>

  peripherals: PeripheralType[] | undefined
  setPeripherals: React.Dispatch<
    React.SetStateAction<PeripheralType[] | undefined>
  >
  peripheral: PeripheralType | undefined
  setPeripheral: React.Dispatch<
    React.SetStateAction<PeripheralType | undefined>
  >
  isGatewayAddMode: boolean
  setIsGatewayAddMode: React.Dispatch<React.SetStateAction<boolean>>
  isGatewayEditMode: boolean
  setIsGatewayEditMode: React.Dispatch<React.SetStateAction<boolean>>

  isPerAddMode: boolean
  setIsPerAddMode: React.Dispatch<React.SetStateAction<boolean>>
  isPerEditMode: boolean
  setIsPerEditMode: React.Dispatch<React.SetStateAction<boolean>>

  error: string | undefined
  addError:(message:string)=>void
}

const AppContext = createContext<State>({} as State)

const AppProvider = ({children}: {children: React.ReactNode}) => {
  const [gateways, setGateways] = useState<GatewayType[] | undefined>()
  const [gateway, setGateway] = useState<GatewayType | undefined>()
  const [peripherals, setPeripherals] = useState<PeripheralType[] | undefined>()
  const [peripheral, setPeripheral] = useState<PeripheralType | undefined>()
  const [isGatewayAddMode, setIsGatewayAddMode] = useState(false)
  const [isGatewayEditMode, setIsGatewayEditMode] = useState(false)
  const [isPerAddMode, setIsPerAddMode] = useState(false)
  const [isPerEditMode, setIsPerEditMode] = useState(false)
  const [error, setError] = useState('')

  const addError = (message: string) => {
    setError(message)
    setTimeout(() => {
      setError('')
    }, 4000)
  }

  return (
    <AppContext.Provider
      value={{
        gateways,
        setGateways,
        gateway,
        setGateway,
        peripherals,
        setPeripherals,
        peripheral,
        setPeripheral,
        isGatewayAddMode,
        setIsGatewayAddMode,
        isGatewayEditMode,
        setIsGatewayEditMode,
        isPerAddMode,
        setIsPerAddMode,
        isPerEditMode,
        setIsPerEditMode,
        error,
        addError,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider

export const useAppContext = () => useContext(AppContext)
