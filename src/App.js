import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from 'react/jsx-runtime'
import Header from '../src/Header'
import MapLayer from '../src/MapLayer'
import { Routes, Route } from 'react-router-dom'
function App() {
  return _jsxs(_Fragment, {
    children: [
      _jsx(Header, {}),
      _jsxs(Routes, {
        children: [
          _jsx(Route, { path: '/', element: _jsx(MapLayer, {}) }),
          _jsx(Route, { path: '/map', element: _jsx(MapLayer, {}) }),
        ],
      }),
    ],
  })
}
export default App
