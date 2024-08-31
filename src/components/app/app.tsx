import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import {AppHeader, IngredientDetails, Modal, OrderInfo} from '@components';
import '../../index.css';
import styles from './app.module.css';
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import {ProtectedRoute} from '../protected-route';
import {useEffect} from 'react';
import {getUserThunk} from 'src/services/slices/userSlice';
import {useDispatch} from 'src/services/store';
import {getIngredientsThunk} from "src/services/slices/ingredientsSlice";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const backgroundLocation = location.state?.background;

  useEffect(() => {
    dispatch(getUserThunk());
    dispatch(getIngredientsThunk())
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader/>
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage/>}/>
        <Route path='/ingredients/:id' element={<IngredientDetails/>}/>
        <Route path='/feed' element={<Feed/>}/>
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login/>
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register/>
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword/>
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword/>
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile/>
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders/>
            </ProtectedRoute>
          }
        />

        <Route path='*' element={<NotFound404/>}/>
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title={'Детали заказа'} onClose={() => navigate(-1)}>
                <OrderInfo/>
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title={'Детали ингредиента'} onClose={() => navigate(-1)}>
                <IngredientDetails/>
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal title={'Детали заказа'} onClose={() => navigate(-1)}>
                  <OrderInfo/>
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
