import "./App.css";
import { RouterProvider } from "react-router";
import { router } from "./routers/mainRouter";
import { Provider } from "react-redux";
import { testChatStore } from "./reducers/testChatReducer";

function App() {
    return (
        <Provider store={testChatStore}>
            <RouterProvider router={router} />
        </Provider>
    );
}

export default App;
