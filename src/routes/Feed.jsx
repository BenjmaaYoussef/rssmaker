import React, {useEffect, useState} from 'react'
import {useLocation, useParams} from 'react-router-dom';
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import {db} from '../Firebase';
import axios from "axios";
import LoadingOverlay from 'react-loading-overlay-ts';
const xmlFormat = require('xml-formatter');

function NewlineText(props) {
  const text = props.text;
  const newText = text.split('\n').map(str => <p>{str}</p>);
  
  return newText;
}
function Feed() {
  const [isActive, setActive] = useState(true)
    const location = useLocation();
    const [xml, setXml] = useState("Loading...")
    let content
    let { id } = useParams();
    const fetchPost = async () => {
      
    const data = await getDoc(doc(db, "feeds", id))
    axios.post("https://us-central1-rssfeeder-2f1c0.cloudfunctions.net/scrape/feed", data.data())
        .then(function (response) {
            setXml(response.data)
            console.log(xml)
            setActive(false)
          })
          .catch(function (error) {
            console.log(error);
          });
  }
 if (xml != "Loading...") {
  content = xmlFormat(xml)
 }
  useEffect(()=>{
      fetchPost();
  }, [])
  return (
    <LoadingOverlay
      active={isActive}
      spinner
      text='Getting you a fresh feed...'
    >
    <div style={{height: "90vh"}}>{content}</div>
    </LoadingOverlay>
  )
}

export default Feed