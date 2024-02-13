import { FC } from 'react';
import PersonList from './components/Person';
import Header from './components/common/Header';

const App: FC = () => {
  return (
    <div className="w-10/12 mx-auto">
      <Header />
      <PersonList />
    </div>
  );
};

export default App;
