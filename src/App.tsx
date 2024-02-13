import { FC } from 'react';
import PersonList from './components/PersonList';
import Header from './components/Header';

const App: FC = () => {
  return (
    <div className="w-10/12 mx-auto">
      <Header />
      <PersonList />
    </div>
  );
};

export default App;
