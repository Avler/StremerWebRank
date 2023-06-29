import { useState, useEffect } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  RouterProvider,
  Outlet,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from './redux/features/productSlice';
import supabase from './supabase';
import Home from './pages/home/home';
import Navbar from './components/Navbar/Navbar';
import FormUser from './components/FormUser/FormUser';
import UserProfile from './pages/userProfile/userProfile';
import axios from 'axios';
import io from 'socket.io-client';
import './app.scss';

const socket = io('http://localhost:4000');

export interface Stremer {
  name: string;
  platform: string;
  description: string;
  vote: number;
  img: string;
  id: string;
  routes: string;
}

const App = () => {
  const dispatch = useDispatch();
  const dataStremers: Stremer[] = useSelector(
    (state: { product: { value: { item: Stremer[] } } }) =>
      state.product.value.item
  );

  const [loginPanel, setLoginPanel] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    const { data, error } = await supabase.from('stremers').select();
    if (error) {
      console.log(error);
    } else {
      dispatch(getAllProducts({ item: data }));
    }
  }

  const elementsRoot = dataStremers.map((elem) => {
    return (
      <Route
        path={elem.routes}
        key={elem.routes}
        element={
          <UserProfile
            dataStremers={dataStremers}
            loginPanelShadow={loginPanel}
          />
        }
      ></Route>
    );
  });

  const Root = () => {
    return (
      <>
        <Navbar showPanel={setLoginPanel} dataStremers={dataStremers} />
        {loginPanel ? (
          <FormUser closePanel={setLoginPanel} fetchData={fetchData} />
        ) : (
          <></>
        )}
        <Outlet />
      </>
    );
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route
          index
          element={
            <Home
              loginPanelShadow={loginPanel}
              dataStremers={dataStremers}
              fetchData={fetchData}
            />
          }
        />
        {elementsRoot}
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;