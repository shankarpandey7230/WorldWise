import { useState, useEffect, createContext, useContext } from 'react';

const CitiesContext = createContext();
const BASE_URL = 'http://localhost:8000';

const CitiesProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (error) {
        alert('There was an error to get data');
      }
      setIsLoading(false);
    };
    fetchCities();
  }, []);

  const getCity = async (id) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (error) {
      alert('There was an error to get data');
    }
    setIsLoading(false);
  };

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, currentCity, setCurrentCity, getCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error('Context used outside of the scope of CitiesProvider');
  }
  return context;
};

export { CitiesProvider, useCities };
