import "./App.css";
import { RouterProvider } from "react-router";
import { router } from "./routers/mainRouter";
import { Provider } from "react-redux";
import { appStore } from "./reducers/reducer";

function App() {
    return (
        <Provider store={appStore}>
            <RouterProvider router={router} />
        </Provider>
    );
}

export default App;
