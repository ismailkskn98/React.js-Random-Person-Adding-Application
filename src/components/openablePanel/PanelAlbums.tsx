import { FC } from 'react';
import { useFetchAlbumsQuery } from '../../reducer/services/albumsApi';
import { Person } from '../../types/types';

type PanelAlbumsProps = {
  person: Person;
};

const PanelAlbums: FC<PanelAlbumsProps> = ({ person }) => {
  const data = useFetchAlbumsQuery(person);
  console.log(data);

  return <div>PanelAlbums</div>;
};

export default PanelAlbums;
