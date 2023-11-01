import React, { useState } from 'react';
import { useAppContext } from './context/appContext';
import GatewayList from './screen/GatewayList';
import GatewayWrapper from './screen/GatewayWrapper';

import styles from './App.module.css';

function App() {
  const { error } = useAppContext();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className={styles.app}>
      {error && (
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      )}
      <h1>
        <a href="/"> Gateway Manger </a>
      </h1>
      <div className={styles.appView}>
        <label className={styles.checkboxLabel} htmlFor="check">
          {open ? (
            <i
              className="fas fa-times"
              style={{ left: '13rem', top: '1.6rem' }}
            />
          ) : (
            <i className="fas fa-bars " />
          )}
        </label>

        <input
          className={styles.checkbox}
          id="check"
          type="checkbox"
          onChange={() => setOpen(!open)}
        />
        <GatewayList open={open} close={() => setOpen(false)} />
        <GatewayWrapper />
      </div>
    </div>
  );
}

export default App;
