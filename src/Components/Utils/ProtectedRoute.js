// authGuard.js
import { getOwnedSystemInfo } from './Data';
import { useEffect,useState } from 'react';
import { Navigate } from 'react-router-dom';
// Create a HOC (Higher Order Component) for protecting routes
export const DeviceProtectedRoute = ({ requiredDevice, children, fallback }) => {
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function checkAccess() {
      try {
        const systemInfo = await getOwnedSystemInfo();
        const ownedDevices = systemInfo.filter(system => system.owned);
        
        // Check if user owns the required device
        const hasRequiredDevice = ownedDevices.some(
          device => device.title.toUpperCase() === requiredDevice.toUpperCase()
        );
        
        setHasAccess(hasRequiredDevice);
      } catch (error) {
        console.error("Error checking device access:", error);
        setHasAccess(false);
      } finally {
        setLoading(false);
      }
    }
    
    checkAccess();
  }, [requiredDevice]);
  
  if (loading) {
    return <div>Loading...</div>; // Or your loading component
  }
  
  return hasAccess ? children : (fallback || <Navigate to="/login" />);
};