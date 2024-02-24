import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../Components/Common/Header";
import Button from "../Components/Common/Button";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import Loader from "../Components/Common/Loader";
import PodcastCard from "../Components/Common/Podcasts/Podcast";
import { collection, getDocs, query, where, doc } from "firebase/firestore";

const Profile=()=>{
    const user = useSelector((state)=>state.user.user);
    const [podcasts, setPodcasts] = useState([]);

    useEffect(()=>{
        const fetchDocs= async()=>{
            const q= query(
                collection(db, "podcasts"),
                where("createdBy","==", user.uid)
            );
            const querySnapshot= await getDocs(q);
            const docsData= querySnapshot.docs.map((doc)=>({
                id: doc.id,
                ...doc.data(),
            }));
            setPodcasts(docsData);
        };
        if(user){
            fetchDocs();
        }
    }, [user]);

    if(!user){
        return <Loader/>
    } 

    const handleLogout=()=>{
        signOut(auth).then(()=>{
            toast.success("User Logged Out!");
        }).catch((error)=>{
            toast.error(error.message);
        });
    };
    return(
        <div>
            <Header/>
            <div className="input-wrapper">
                <h1>Profile</h1>
                <div style={{display:"flex",justifyContent:"center", marginBottom:"2rem"}}>
                    <PodcastCard title={user.name} displayImage={user.profilePic}/>
                </div>
                <h1 style={{marginBottom:"2rem"}}>My Podcasts</h1>
                <div className="podcasts-flex">
                    {podcasts.length==0?(
                        <p style={{fontSize:"1.2rem"}}>You Have Zero Podcasts</p>
                    ):(
                        <>
                            {podcasts.map((podcast)=>(
                                <PodcastCard
                                key={podcast.id}
                                id={podcast.id}
                                title={podcast.title}
                                displayImage={podcast.displayImage}
                                />
                            ))}
                        </>
                    )}
                </div>
            </div>
            <div style={{marginLeft: "300px"}}>
                <Button text={"Logout"} onClick={handleLogout}/>
            </div>
        </div>
    )
}

export default Profile;