import AppRoutes from "./AppRoutes";
import { AuthProvider } from "./common/context/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </>
  )
}

export default App;