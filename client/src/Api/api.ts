import {
  GetGatewayRes,
  GetGatewayByIdRes,
  AddGatewayRes,
  gatewayAdd,
  UpdateGatewayRes,
  gatewayUpdate,
  DeleteGatewayRes,
  AddPerRes,
  peripheralAdd,
  UpdatePerRes,
  peripheralUpdate,
} from '../types'

interface GatewayDao {
  getGatways(): Promise<GetGatewayRes | undefined>
  getGatwayById(gId: string): Promise<GetGatewayByIdRes | undefined>
  addGateway(gateway: gatewayAdd): Promise<AddGatewayRes | undefined>
  updateGatway(gateway: gatewayUpdate): Promise<UpdateGatewayRes | undefined>
  deleteGatway(gId: string): Promise<DeleteGatewayRes | undefined>
}

interface PeripheralDao {
  addPeripheral(peripheral: peripheralAdd): Promise<AddPerRes | undefined>
  updatePeripheral(
    peripheral: peripheralUpdate,
  ): Promise<UpdatePerRes | undefined>
  deletePeripheral(pId: string): Promise<{} | undefined>
}

 class Api implements GatewayDao, PeripheralDao {
  public URL: string = 'http://localhost:5000/'

  async getGatways(): Promise<GetGatewayRes | undefined> {
    try {
      const res = await fetch(`${this.URL}gateway`)

      return await res.json()
    } catch (err) {
      if (err instanceof Error) console.log(err.message)
    }
  }

  async getGatwayById(gId: string): Promise<GetGatewayByIdRes | undefined> {
    try {
      const res = await fetch(`${this.URL}gateway/${gId}`)
      return await res.json()
    } catch (err) {
      if (err instanceof Error) console.log(err.message)
    }
  }

  async addGateway(gateway: gatewayAdd): Promise<AddGatewayRes | undefined> {
    try {
      const res = await fetch(`${this.URL}gateway`, {
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

  async updateGatway(
    gateway: gatewayUpdate,
  ): Promise<UpdateGatewayRes | undefined> {
    try {
      const res = await fetch(`${this.URL}gateway/${gateway._id}`, {
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
      if (err instanceof Error) console.log('Errrror', err.message)
    }
  }
  async deleteGatway(gId: string): Promise<DeleteGatewayRes | undefined> {
    const res = await fetch(`${this.URL}gateway/${gId}`, {
      method: 'DELETE',
    })
    try {
      const data = await res.json()
      return data.data
    } catch (err) {
      if (err instanceof Error) console.log(err)
    }
  }

  async addPeripheral(
    peripheral: peripheralAdd,
  ): Promise<AddPerRes | undefined> {
    try {
      const res = await fetch(`${this.URL}peripheral`, {
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
  async updatePeripheral(
    peripheral: peripheralUpdate,
  ): Promise<UpdatePerRes | undefined> {
    try {
      const res = await fetch(`${this.URL}peripheral/${peripheral._id}`, {
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
  async deletePeripheral(pId: string): Promise<{} | undefined> {
    try {
      const res = await fetch(`${this.URL}peripheral/${pId}`, {
        method: 'DELETE',
      })
      return await res.json()
    } catch (err) {
      if (err instanceof Error) console.log(err.message)
    }
  }
}
const api = new Api()
export default api

