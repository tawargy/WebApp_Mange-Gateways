import {GatewayType, PeripheralType} from './types'

const URL = 'http://localhost:5000/'

export const getGatways = async (): Promise<GatewayType[] | undefined> => {
  try {
    const res = await fetch(`${URL}gateway`)
    const data = await res.json()
    return data.data
  } catch (err) {
    if (err instanceof Error) {
      throw err
    }
  }
}

//const url=process.env.PUBLIC_URL

export const getGatwayById = async (
  gId: string,
): Promise<GatewayType | undefined> => {
  try {
    const res = await fetch(`${URL}gateway/${gId}`)
    const data = await res.json()

    return data.data
  } catch (err) {
    if (err instanceof Error) throw err
  }
}

type gatewayAdd = Pick<GatewayType, 'serial' | 'name' | 'ip'>
export const addGateway = async (
  gateway: gatewayAdd,
): Promise<GatewayType | undefined> => {
  try {
    const res = await fetch(`${URL}gateway`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: gateway.name,
        serial: gateway.serial,
        ip: gateway.ip,
      }),
    })
    const data = await res.json()
    return data.data
  } catch (err) {
    if (err instanceof Error) throw err
  }
}

type gatewayUpdate = Pick<GatewayType, '_id' | 'serial' | 'name' | 'ip'>
export const updateGatway = async (
  gateway: gatewayUpdate,
): Promise<GatewayType | undefined> => {
  try {
    const res = await fetch(`${URL}gateway/${gateway._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: gateway.name,
        serial: gateway.serial,
        ip: gateway.ip,
      }),
    })
    const data = await res.json()

    return data.data
  } catch (err) {
    if (err instanceof Error) throw err
  }
}

export const deleteGatway = async (gId: string): Promise<{} | undefined> => {
  try {
    const res = await fetch(`${URL}gateway/${gId}`, {
      method: 'DELETE',
    })
    const data = await res.json()

    return data.data
  } catch (err) {
    if (err instanceof Error) throw err
  }
}

type peripheralAdd = Pick<
  PeripheralType,
  'uid' | 'vendor' | 'status' | 'gatewayId'
>
export const addPeripheral = async (
  peripheral: peripheralAdd,
): Promise<PeripheralType | undefined> => {
  try {
    const res = await fetch(`${URL}peripheral`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: peripheral.uid,
        vendor: peripheral.vendor,
        status: peripheral.status,
        gatewayId: peripheral.gatewayId,
      }),
    })
    const data = await res.json()

    return data.data
  } catch (err) {
    if (err instanceof Error) throw err
  }
}

type peripheralUpdate = Pick<
  PeripheralType,
  '_id' | 'uid' | 'vendor' | 'status'
>
export const updatePeripheral = async (
  peripheral: peripheralUpdate,
): Promise<PeripheralType | undefined> => {
  try {
    const res = await fetch(`${URL}peripheral/${peripheral._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: peripheral.uid,
        vendor: peripheral.vendor,
        status: peripheral.status,
      }),
    })
    const data = await res.json()

    return data.data
  } catch (err) {
    if (err instanceof Error) throw err
  }
}

export const deletePeripheral = async (
  pId: string,
): Promise<{} | undefined> => {
  try {
    const res = await fetch(`${URL}peripheral/${pId}`, {
      method: 'DELETE',
    })
    const data = await res.json()

    return data.data
  } catch (err) {
    if (err instanceof Error) throw err
  }
}
