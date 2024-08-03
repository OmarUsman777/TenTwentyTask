// @ts-nocheck
// Setup of Network Inspect of Chrome Developer Tools.
export default () => {
    global.XMLHttpRequest = global.originalXMLHttpRequest ? global.originalXMLHttpRequest : global.XMLHttpReques;
    global.FormData = global.originalFormData ? global.originalFormData : global.FormData;
    if (window.__FETCH_SUPPORT__) {
        // it's RNDebugger only to have
        window.__FETCH_SUPPORT__.blob = false;
    } else {
        /*
         * Set __FETCH_SUPPORT__ to false is just work for `fetch`.
         */
        global.FileReader = global.originalFileReader ? global.originalFileReader : global.FileReader;
    }
};
