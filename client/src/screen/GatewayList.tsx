import React, { useEffect } from 'react';
import { useAppContext } from '../context/appContext';
import { GatewayType } from '../types';
import api from '../Api/api';
import styles from './GatewayList.module.css';

/* eslint no-underscore-dangle: 0 */
interface Props {
  open: boolean;
  close: () => void;
}
function GateWayList({ open, close }: Props) {
  const {
    gateways,
    setGateways,
    setGateway,
    setIsGatewayAddMode,
    setIsGatewayEditMode,
    setPeripherals,
    setIsPerEditMode,
    addError,
  } = useAppContext();

  useEffect(() => {
    const setGatewaysList = async () => {
      const res = await api.getGatways();
      if (!res) return;

      setGateways(res.data);
    };
    setGatewaysList();
  }, []);

  const addNewGatewayHandler = () => {
    setIsGatewayAddMode(true);
    setIsPerEditMode(false);
    close();
  };

  const gatewayViewClickHandler = async (
    e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
  ) => {
    const { id } = e.currentTarget;
    setIsGatewayAddMode(false);
    setIsGatewayEditMode(false);
    const res = await api.getGatwayById(id);
    if (res) {
      if (res.message) {
        addError(res.message);
        return;
      }

      setGateway(res.data);
      setPeripherals(res.data.peripherals);
      setIsPerEditMode(false);
      close();
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      gatewayViewClickHandler(event);
    }
  };
  return (
    <div className={`${styles.gatewayStack} ${open ? styles.show : ''}`}>
      <button
        type="button"
        className={styles.btnAdd}
        onClick={addNewGatewayHandler}
      >
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
              onKeyDown={handleKeyDown}
              role="button"
              tabIndex={0}
            >
              <span className={styles.gatewaySerial}> {gateway.serial}</span>
              <span className={styles.gatewayCircle}>
                <span className={styles.gatewayLength}>
                  {' '}
                  {gateway.peripherals?.length}{' '}
                </span>
              </span>
            </div>
          );
        })}
    </div>
  );
}

export default GateWayList;
