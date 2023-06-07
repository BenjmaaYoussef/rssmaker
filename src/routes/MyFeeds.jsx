import React, { useMemo, useState, useEffect , useRef } from 'react'
import MaterialReactTable from 'material-react-table';
import "../App.css"
import {db} from "../Firebase"
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext'
import ListFeeds from './ListFeeds';
import LoadingOverlay from 'react-loading-overlay-ts';



function MyFeeds() {
   const {currentUser} = useAuth()
   const [listPost, setListPost] = useState([])
   const [active, setActive] = useState(true)
   const getList = async () => {
        let hey = []
        const cityRef = collection(db, "feeds")
        const q = query(cityRef, where("user", "==", "fovRcXkSYsOY3Gf0jo63xhZZdRY2"))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            hey.push({...doc.data(), id: doc.id})
        });
        return hey
    }
    useEffect(() => {
        (async () => {
            setListPost(await getList())
            setActive(false)
         })()
    }, [])
  return (
    <div>
        <LoadingOverlay
        active={active}
        spinner
        text='Loading'
        >
            <ListFeeds list={listPost} />
        </LoadingOverlay>
        
    </div>
  )
}

export default MyFeeds