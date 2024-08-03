// DEVELOPED BY: OMAR USMAN
// omar.ali35533@gmail.com
import React from "react";
import { LogBox } from "react-native";
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import AppSetupGate from "./utils/AppSetup";
import { createStore } from "./createStore";
import NavigationSetup from "./utils/NavigationSetup";


LogBox.ignoreLogs(["Require cycle:", "deprecated-react-native-prop-types"]);

const BoilerPlateApp = () => {
    return (
        <AppSetupGate>
            {() => {
                const store = createStore();
                return (
                    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                        <Provider store={store}>
                            <NavigationSetup />
                        </Provider>
                    </SafeAreaProvider>
                );
            }}
        </AppSetupGate>
    );
};

export default BoilerPlateApp;
