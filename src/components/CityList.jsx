import styles from './CityList.module.css';
import Spinner from './Spinner';
import CityItem from './CityItem';
import Message from './Message';
import { useCities } from '../contexts/CitiesContext';

const CityList = () => {
  const { cities, isLoading } = useCities();
  //   console.log(cities, isLoading);
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return <Message message="Add your First City clicking on the map" />;
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
};

export default CityList;
