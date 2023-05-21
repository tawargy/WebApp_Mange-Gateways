import {GatewayType, PeripheralType} from './types'

const URL = 'http://localhost:5000/'

type GetGatewayRes = {
  data: GatewayType[]
  message?: string
}

export const getGatwaysApi = async (): Promise<GetGatewayRes | undefined> => {
  try {
    const res = await fetch(`${URL}gateway`)

    return await res.json()
  } catch (err) {
    if (err instanceof Error) console.log(err.message)
  }
}
type GetGatewayByIdRes = {
  data: GatewayType
  message?: string
}
export const getGatwayByIdApi = async (
  gId: string,
): Promise<GetGatewayByIdRes | undefined> => {
  try {
    const res = await fetch(`${URL}gateway/${gId}`)
    return await res.json()
  } catch (err) {
    if (err instanceof Error) console.log(err.message)
  }
}

type gatewayAdd = Pick<GatewayType, 'serial' | 'name' | 'ip'>
type AddGatewayRes = {
  data: GatewayType
  message?: string
}

export const addGatewayApi = async (
  gateway: gatewayAdd,
): Promise<AddGatewayRes | undefined> => {
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

    return await res.json()
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message)
    }
  }
}

type gatewayUpdate = Pick<GatewayType, '_id' | 'serial' | 'name' | 'ip'>
type updateGatewayRes = {
  data: GatewayType
  message?: string
}

export const updateGatwayApi = async (
  gateway: gatewayUpdate,
): Promise<updateGatewayRes | undefined> => {
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
    return await res.json()
  } catch (err) {
    if (err instanceof Error) console.log('Errrror',err.message)
  }
}

type deleteGatewayRes = {
  data: GatewayType
  message?: string
}
export const deleteGatwayApi = async (
  gId: string,
): Promise<deleteGatewayRes | undefined> => {
  const res = await fetch(`${URL}gateway/${gId}`, {
    method: 'DELETE',
  })
  try {
    const data = await res.json()
    return data.data
  } catch (err) {
    if (err instanceof Error) console.log(err)
  }
}

type peripheralAdd = Pick<
  PeripheralType,
  'uid' | 'vendor' | 'status' | 'gatewayId'
>
type AddPerRes = {
  data: PeripheralType
  message?: string
}

export const addPeripheralApi = async (
  peripheral: peripheralAdd,
): Promise<AddPerRes | undefined> => {
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
    return await res.json()
  } catch (err) {
    if (err instanceof Error) console.log(err.message)
  }
}

type peripheralUpdate = Pick<
  PeripheralType,
  '_id' | 'uid' | 'vendor' | 'status'
>
type UpdatePerRes = {
  data: PeripheralType
  message?: string
}
export const updatePeripheralApi = async (
  peripheral: peripheralUpdate,
): Promise<UpdatePerRes | undefined> => {
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
    return await res.json()
  } catch (err) {
    if (err instanceof Error) console.log(err.message)
  }
}
export const deletePeripheralApi = async (
  pId: string,
): Promise<{} | undefined> => {
  try {
    const res = await fetch(`${URL}peripheral/${pId}`, {
      method: 'DELETE',
    })
    return await res.json()
  } catch (err) {
    if (err instanceof Error) console.log(err.message)
  }
}
