import Dashboard from './pages/Dashboard';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'MyPulse 9.0 Dashboard',
    path: '/',
    element: <Dashboard />
  }
];

export default routes;
