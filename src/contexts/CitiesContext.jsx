import {
  useState,
  useEffect,
  createContext,
  useContext,
  useReducer,
} from 'react';

const CitiesContext = createContext();
const BASE_URL = 'http://localhost:8000';

const CitiesProvider = ({ children }) => {
  const initialState = {
    cities: [],
    isLoading: 'false',
    currentCity: {},
    error: '',
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'loading':
        return {
          ...state,
          isLoading: true,
        };
      case 'cities/loaded':
        return {
          ...state,
          isLoading: false,
          cities: action.payload,
        };
      case 'city/loaded':
        return { ...state, isLoading: false, currentCity: action.payload };
      case 'city/created':
        return {
          ...state,
          isLoading: false,
          cities: [...state.cities, action.payload],
          currentCity: action.payload,
        };
      case 'city/deleted':
        return {
          ...state,
          isLoading: false,
          cities: state.cities.filter((city) => city.id !== action.payload),
          currentCity: {},
        };

      case 'rejected':
        return {
          ...state,
          isLoading: 'false',
          error: action.payload,
        };
      default:
        throw new Error('Not related actions type found');
    }
  };
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [currentCity, setCurrentCity] = useState({});
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const fetchCities = async () => {
      dispatch({ type: 'loading' });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: 'cities/loaded', payload: data });
      } catch (error) {
        dispatch({
          type: 'rejected',
          payload: 'There was an error loading cities ...',
        });
      }
    };
    fetchCities();
  }, []);

  const getCity = async (id) => {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: 'city/loaded', payload: data });
    } catch (error) {
      dispatch({
        type: 'rejected',
        payload: 'There was an error loading city ...',
      });
    }
  };
  const createCity = async (newCity) => {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      // console.log(data);
      dispatch({ type: 'city/created', payload: data });
    } catch (error) {
      dispatch({
        type: 'rejected',
        payload: 'There was an error creating  city ...',
      });
    }
  };
  const deleteCity = async (id) => {
    if (Number(id) === currentCity.id) return;
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });

      dispatch({ type: 'city/deleted', payload: id });
    } catch (error) {
      dispatch({
        type: 'rejected',
        payload: 'There was an error deleting data ...',
      });
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,

        getCity,
        createCity,
        deleteCity,
      }}
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
