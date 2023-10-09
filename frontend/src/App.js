import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { publicRoutes } from "./routes";
import DefaultLayout from "./Layout/DefaultLayout.js";
import GlobalStyles from "./GlobalStyles";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            const Layout = DefaultLayout;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
