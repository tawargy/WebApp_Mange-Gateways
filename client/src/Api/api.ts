import {
  GetGatewayRes,
  GetGatewayByIdRes,
  AddGatewayRes,
  GatewayAddParam,
  GatewayUpdateParam,
  UpdateGatewayRes,
  DeleteGatewayRes,
  AddPerRes,
  UpdatePerRes,
  PeripheralAddParam,
  PeripheralUpdateParam,
} from '../types';

interface GatewayDao {
  getGatways(): Promise<GetGatewayRes | undefined>;
  getGatwayById(gId: string): Promise<GetGatewayByIdRes | undefined>;
  addGateway(gateway: GatewayAddParam): Promise<AddGatewayRes | undefined>;
  updateGatway(
    gateway: GatewayUpdateParam
  ): Promise<UpdateGatewayRes | undefined>;
  deleteGatway(gId: string): Promise<DeleteGatewayRes | undefined>;
}

interface PeripheralDao {
  addPeripheral(peripheral: PeripheralAddParam): Promise<AddPerRes | undefined>;
  updatePeripheral(
    peripheral: PeripheralUpdateParam
  ): Promise<UpdatePerRes | undefined>;
  deletePeripheral(pId: string): Promise<never | undefined>;
}

/* eslint no-underscore-dangle: 0 */
class Api implements GatewayDao, PeripheralDao {
  public URL = 'http://localhost:5000/';

  async getGatways(): Promise<GetGatewayRes | undefined> {
    try {
      const res = await fetch(`${this.URL}gateway`);

      return await res.json();
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
    }
    return undefined;
  }

  async getGatwayById(gId: string): Promise<GetGatewayByIdRes | undefined> {
    try {
      const res = await fetch(`${this.URL}gateway/${gId}`);
      return await res.json();
    } catch (err) {
      if (err instanceof Error) throw err;
    }
    return undefined;
  }

  async addGateway(
    gateway: GatewayAddParam
  ): Promise<AddGatewayRes | undefined> {
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
      });

      return await res.json();
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
    }
    return undefined;
  }

  async updateGatway(
    gateway: GatewayUpdateParam
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
      });
      return await res.json();
    } catch (err) {
      if (err instanceof Error) throw err;
    }
    return undefined;
  }

  async deleteGatway(gId: string): Promise<DeleteGatewayRes | undefined> {
    const res = await fetch(`${this.URL}gateway/${gId}`, {
      method: 'DELETE',
    });
    try {
      const data = await res.json();
      return data.data;
    } catch (err) {
      if (err instanceof Error) throw err;
    }
    return undefined;
  }

  async addPeripheral(
    peripheral: PeripheralAddParam
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
      });
      return await res.json();
    } catch (err) {
      if (err instanceof Error) throw err;
    }
    return undefined;
  }

  async updatePeripheral(
    peripheral: PeripheralUpdateParam
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
      });
      return await res.json();
    } catch (err) {
      if (err instanceof Error) throw err;
    }
    return undefined;
  }

  async deletePeripheral(pId: string): Promise<never | undefined> {
    try {
      const res = await fetch(`${this.URL}peripheral/${pId}`, {
        method: 'DELETE',
      });
      return await res.json();
    } catch (err) {
      if (err instanceof Error) throw err;
    }
    return undefined;
  }
}

const api = new Api();
export default api;
