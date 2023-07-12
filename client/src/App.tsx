import { useAppContext } from './context/appContext';
import GatewayList from './screen/GatewayList';
import GatewayWrapper from './screen/GatewayWrapper';

import styles from './App.module.css';

function App() {
  const { error } = useAppContext();

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
        <GatewayList />
        <GatewayWrapper />
      </div>
    </div>
  );
}

export default App;
