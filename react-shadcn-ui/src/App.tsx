import { Header } from '@/components/layouts/header';
import { Footer } from '@/components/layouts/footer';
import { InputViewer } from './features/builder';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title="hola" />
      <InputViewer />
      <Footer />
    </div>
  );
}

export default App;
