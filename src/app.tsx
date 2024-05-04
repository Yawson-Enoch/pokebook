import AccentSwitcher from './components/common/accent-switcher';
import { AccentProvider } from './context/accent-provider';

export default function App() {
  return (
    <AccentProvider>
      <AccentSwitcher />
    </AccentProvider>
  );
}
