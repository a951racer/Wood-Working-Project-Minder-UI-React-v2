__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Routes; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _providers_token_hook__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../providers/token/hook */ "./src/providers/token/hook.js");
/* harmony import */ var _Pages_Auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Pages/Auth */ "./src/Pages/Auth/index.js");



 //import ProjectsPage from '../../Pages/Projects'
//import ProjectDetailsPage from '../../Pages/ProjectDetails'
//import ProfilePage from '../../Pages/Profile'

function Routes() {
  var _useTokenContext = Object(_providers_token_hook__WEBPACK_IMPORTED_MODULE_2__["default"])(),
      getToken = _useTokenContext.getToken;

  var token = getToken();
  console.log("HERE");
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], null, token && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Redirect"], {
    from: "/auth",
    to: "/projects",
    exact: true
  }), !token && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    path: "/auth",
    component: _Pages_Auth__WEBPACK_IMPORTED_MODULE_3__["default"]
  }), !token && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Redirect"], {
    to: "/auth",
    exact: true
  }));
} //export default Routes