import { useParams } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ValveProvider } from './ValveContext';
import { DeviceProtectedRoute } from './ProtectedRoute';

const Hexa = lazy(() => import('../Product_Pages/Hexa'));
const Quadra = lazy(() => import('../Product_Pages/Quadra'));
const Octa = lazy(() => import('../Product_Pages/Octa'));
const Uno = lazy(() => import('../Product_Pages/Uno'));

function ProductRouter() {
  const { id } = useParams();
  console.log("the id dynamic", id);

  let Component = null;
  let requiredDevice = null;

  switch (id?.toLowerCase()) {
    case 'hexa':
      Component = Hexa;
      requiredDevice = 'HEXA';
      break;
    case 'uno':
        Component = Uno;
        requiredDevice = 'UNO';
        break;
    case 'quadra':
        Component = Quadra;
        requiredDevice = 'QUADRA';
        break;
    case 'octa':
        Component = Octa;
        requiredDevice = 'OCTA';
        break;
    
    

    // add more cases like:
    // case 'uno':
    //   Component = Uno;
    //   requiredDevice = 'UNO';
    //   break;

    default:
      return <div>404: Page Not Found</div>;
  }

  return (
    <ValveProvider>
      <DeviceProtectedRoute requiredDevice={requiredDevice}>
        <Suspense fallback={<div>Loading...</div>}>
          <Component />
        </Suspense>
      </DeviceProtectedRoute>
    </ValveProvider>
  );
}

export default ProductRouter;
