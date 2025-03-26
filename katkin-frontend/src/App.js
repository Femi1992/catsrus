"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var nextDelivery_1 = require("./nextDelivery");
var App = function () {
    return (<react_router_dom_1.BrowserRouter>
      <react_router_dom_1.Routes>
        <react_router_dom_1.Route path="/comms/your-next-delivery/:id" element={<nextDelivery_1.default />}/>
      </react_router_dom_1.Routes>
    </react_router_dom_1.BrowserRouter>);
};
exports.default = App;
// http://localhost:3000/users/c1307701-fe57-4be6-bdc5-184700d69f4d/next-delivery
