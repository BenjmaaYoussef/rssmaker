import React from 'react'
import {useState} from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import LoadingOverlay from 'react-loading-overlay-ts';
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import { useAuth } from '../context/AuthContext'

function Hero() {
    const [inputValue, setInputValue] = useState("")
    const [isActive, setActive] = useState(false)
    const {currentUser} = useAuth()
    const [isReadyLoading, setIsReadyLoading] = useState(false)
    const [availableFeeds, setAvailableFeeds] = useState([])
    const navigate = useNavigate();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    const sendLink = () => {
      if (inputValue != "" || inputValue == "https://") {

        
        setIsReadyLoading(true)
        axios.post("https://us-central1-rssfeeder-2f1c0.cloudfunctions.net/scrape/search_ready", {
          url: inputValue
        })
        .then(res => {
          console.log("*******************************")
          console.log(res.data)
          if (res.data.results.length == 0) {
            setActive(true)
            console.log("Builder")
            axios.post("https://us-central1-rssfeeder-2f1c0.cloudfunctions.net/scrape/url", {
              url: inputValue
            })
            .then(function (response) {
              console.log(response);
              setActive(false)
              setIsReadyLoading(false)
              navigate("/selector", {state: {url: response.data, urlLink: inputValue}});
            })
            .catch(function (error) {
              console.log(error);
            });
          } else {
            setIsReadyLoading(false)
            console.log("readylink")
            setAvailableFeeds(res.data.results)
            console.log(res.data.results)
          }
        })
      } else {
        enqueueSnackbar('Please enter a valid url', {
          variant: "error"
        })
      }
    }
    const confirmFeed = (urlId) => {
      setActive(true)
      axios.post("https://us-central1-rssfeeder-2f1c0.cloudfunctions.net/scrape/selectors", {
              url: null,
              postContainer: null,
              title: null,
              description: null,
              user: null,
              readyLink: urlId.substring(5),
              user: currentUser.uid
            })
            .then(function (response) {
              setActive(false)
              console.log(response);
              setIsReadyLoading(true)
              navigate("/success", {state: {id: response.data}});
            })
            .catch(function (error) {
              console.log(error);
            });
    }
  return (
    <LoadingOverlay
      active={isActive}
      spinner
      text='Loading...'
    >
    <section className="px-4 py-24 mx-auto max-w-7xl">
  <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
    <h1 className="mb-6 text-4xl font-extrabold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight">
      Build your own <span className="block w-full text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-500 lg:inline">RSS feed</span> from almost any website.
    </h1>
    <p className="px-0 mb-6 text-lg text-gray-600 md:text-xl lg:px-24">
      Use our builder to make your own RSS feed for free!
    </p>
    <div className="mb-4 space-x-0 md:space-x-2 md:mb-12">
      <div className="inline-flex items-center justify-center w-full mb-2 sm:w-auto sm:mb-0">
        <input className="form-input form-input-lg" placeholder="https://" defaultValue="https://" id="name" onChange={(e) => {setInputValue(e.target.value)}}/>
      </div>
      <div className="inline-flex items-center justify-center w-full mb-2 sm:w-auto sm:mb-0">
        <button className="inline-flex items-center justify-center w-full ml-2 mb-2 btn btn-light btn-xl sm:w-auto sm:mb-0" onClick={() => sendLink()}>
          {!isReadyLoading ? "Create" : "Creating..."}
        </button>
      </div>
    </div>
    
  </div>
  <div>
    {availableFeeds.map(el => {
      return <div>
        <div onClick={() => confirmFeed(el.id)} className="container  parent bg-gray-100">
          <div className="div1">
            {el.coverUrl && <div className="photo" style={{backgroundImage: "url(" + el.coverUrl + ")"}}>
            </div>}
          </div>
          <div className="div2">
            
  <div className="author">
    {el.topics && el.topics.map(element => {
      return <span> {element} |</span>
    })}
  </div>
  {el.lastUpdated && <div className="time">
    <p>Last updated: {new Date(el.lastUpdated).toLocaleString()}</p>
  </div>}
  {el.title && <div className="header">
    <p>{el.title}</p>
  </div>}
  {
    el.description && <div className="description">
    <p>{el.description}</p>
  </div>
  }
  
  
  </div>
</div>
      </div>
    })}
  </div>
</section>
</LoadingOverlay>
  )
}

export default Hero