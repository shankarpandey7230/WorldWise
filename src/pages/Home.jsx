import { PageNav, AppNav } from '../components';

import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div>
      <PageNav />
      <AppNav />

      <h1>World Wise </h1>
      <Link to="/app">Go to the app</Link>
    </div>
  );
};

export default Home;
