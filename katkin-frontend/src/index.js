"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// filepath: /Users/victor/Documents/projects/Katkin/tech-test-2024/katkin-frontend/src/index.tsx
var react_1 = require("react");
var client_1 = require("react-dom/client");
require("./index.css");
var App_1 = require("./App");
var rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error("Root element with ID 'root' not found in the DOM.");
}
var root = client_1.default.createRoot(rootElement);
root.render(<react_1.default.StrictMode>
    <App_1.default />
  </react_1.default.StrictMode>);
