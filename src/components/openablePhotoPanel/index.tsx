import { FC, ReactNode } from 'react';

type OpenablePhotoPanelProps = {
  children: ReactNode;
};

const OpenablePhotoPanel: FC<OpenablePhotoPanelProps> = ({ children }) => {
  return <>{children}</>;
};

export default OpenablePhotoPanel;
