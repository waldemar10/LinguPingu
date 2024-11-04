import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./Routes";
import useRefreshToken from "./components/useRefreshToken";
// * Import the global CSS file.
import "./App.css";

// * The App component represents the main component of the application.
function App() {
  useRefreshToken();
  return (
    <div>
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;
