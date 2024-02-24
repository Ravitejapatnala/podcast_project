import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import SignUp from "./Pages/Signup";
import Profile from './Pages/Profile';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { useDispatch } from 'react-redux';
import { setUser } from './slices/userSlice';
import PrivateRoutes from './Components/Common/PrivateRoutes';
import CreateAPodcastPage from './Pages/CreateAPodcastPage';
import PodcastsPage from './Pages/Podcasts';
import PodcastDetails from './Pages/PodcastDetails';
import CreateAnEpisode from './Pages/CreateAnEpisode';

function App() {
  const dispatch= useDispatch();
  useEffect(()=>{
    const unSubscribeAuth = onAuthStateChanged(auth, (user)=>{
      if(user){
        const unsubscribeSnapshot= onSnapshot(
          doc(db, "users", user.uid),
          (userDoc)=>{
            if(userDoc.exists()){
              const userData= userDoc.data();
              dispatch(
                setUser({
                  name: userData.name,
                  email: userData.email,
                  uid: user.uid,
                })
              );
            }
          },
          (error)=>{
            console.error("Error fetching user data:", error);
          }
        );

        return()=>{
          unsubscribeSnapshot();
        };
      }
    });

    return ()=>{
      unSubscribeAuth();
    }
  }, []) 
  return (
    <div className="App">
      <ToastContainer/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignUp/>} ></Route>
          <Route element={<PrivateRoutes/>}>
            <Route path='/profile' element={<Profile/>}></Route>
            <Route path='/create-a-podcast' element={<CreateAPodcastPage/>} />
            <Route path='/podcasts' element={<PodcastsPage/>}/>
            <Route path='/podcast/:id' element={<PodcastDetails/>}/>
            <Route path='/podcast/:id/create-episode' element={<CreateAnEpisode/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
