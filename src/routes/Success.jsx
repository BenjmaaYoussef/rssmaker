import '../App.css';
import '../index.css';

import React, {useState} from 'react'
import { useLocation } from "react-router-dom";

function Hero() {
    const location = useLocation();
    const [copied, setCopied] = useState("Copy")

  return (
    <section className="px-4 py-24 mx-auto max-w-7xl">
  <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
    <h1 className="mb-6 text-4xl font-extrabold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight">
      Here's your own <span className="block w-full text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-500 lg:inline">RSS feed</span> link:
    </h1>
    <div className="mb-4 space-x-0 md:space-x-2 md:mb-12">
      <div className="inline-flex items-center justify-center w-full mb-2 sm:mb-0">
        <input className="form-input form-input-lg" readOnly id="name" value={"https://rssfeeder-2f1c0.web.app/feed/" + location.state.id}/>
        <button className='btn btn-primary btn-xl' onClick={() => {
            navigator.clipboard.writeText("https://us-central1-rssfeeder-2f1c0.cloudfunctions.net/scrape/feed/" + location.state.id)
            setCopied("Copied!")
            setTimeout(() => {
                setCopied("Copy")
            }, 5000)
        }}>{copied}</button>
      </div>
      
    </div>
  </div>
</section>
  )
}

export default Hero