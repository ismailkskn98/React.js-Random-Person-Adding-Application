import { FC, ReactNode } from 'react';

type OpenablePanelProps = {
  children: ReactNode;
};

const OpenablePanel: FC<OpenablePanelProps> = ({ children }) => {
  return <>{children}</>;
};

export default OpenablePanel;
