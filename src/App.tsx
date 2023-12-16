import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SignInPage from './Pages/SignInPage';
import SignUpPage from './Pages/SignupPage';
import { Provider } from 'react-redux';
import reduxStore from './store';
import ProtectedRoute from './Pages/ProtectedRoute';
import DashboardPage from './Pages/DashboardPage';

const App: React.FC = () => {
  return (
    <Provider store={reduxStore}>
    <Router>
      <Routes>
        <Route path="/signin"  element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/"  element={<SignInPage />} />
        <Route path='/dashboard' element={<ProtectedRoute><DashboardPage/></ProtectedRoute>} />
      </Routes>
    </Router>
    </Provider>
  );
};

export default App;
