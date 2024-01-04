import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { publicRoutes } from "./routes";
import DefaultLayout from "./Layout/DefaultLayout.js";
import GlobalStyles from "./GlobalStyles";
import { ToastContainer } from "react-toastify";
import { ListMemberProvider } from "./Pages/ThemHoDan/listMemberContext.js";
function App() {
  return (
    <ListMemberProvider>
      <div>
        <Router>
          <Routes>

            {publicRoutes.map((route, index) => {
              const Page = route.component;
              let Layout = DefaultLayout;
              if (route.layout) {
                Layout = route.layout;
              }

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <ToastContainer autoClose={3000} hideProgressBar position="top-center" />
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </Router>
      </div>
    </ListMemberProvider>
  );
}

export default App;
