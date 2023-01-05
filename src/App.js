import {QueryClient, QueryClientProvider} from 'react-query';
import { useEffect } from 'react';
import Country from './Country';
import './App.css';
function App() {

  useEffect(() => {
    document.title = "Country DataBase"
 }, []);
  const queryClient = new QueryClient();


  return (
    <QueryClientProvider client={queryClient}>
      <Country/>
		</QueryClientProvider>
  );
}

export default App;
