"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var userNextDelivery_1 = require("./userNextDelivery");
var NextDeliveryPage = function () {
    var id = (0, react_router_dom_1.useParams)().id; // Extract the ID from the URL
    if (!id) {
        return <div>Error: No user ID provided in the URL.</div>;
    }
    return (<div className="next-delivery-page">
      <h1>Next Delivery Details</h1>
      <userNextDelivery_1.default userId={id}/> {/* Pass the ID to the NextDelivery component */}
    </div>);
};
exports.default = NextDeliveryPage;
