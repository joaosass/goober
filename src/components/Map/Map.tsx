import useMap from "@hooks/useMap";

import styles from './Map.module.css';

export default function Map() {
  const mapRef = useMap();

  return (
    <div className={styles.map} ref={mapRef} />
  )
}
