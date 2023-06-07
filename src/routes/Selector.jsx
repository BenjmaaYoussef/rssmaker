import React, { useEffect } from 'react'
import "../App.css"
import ElementPicker from "html-element-picker"
import { getCssSelector } from "css-selector-generator";
import useState from 'react-usestateref'
import {useLocation, useNavigate} from 'react-router-dom';
import parse from 'html-react-parser';
import axios from "axios"
import { useSnackbar } from 'notistack'
import LoadingOverlay from 'react-loading-overlay-ts';
import { useAuth } from '../context/AuthContext'


function Selector() {
    const location = useLocation();
    const navigate = useNavigate()
    const [isActive, setActive] = useState(true)
    const {currentUser} = useAuth()
    const [focusedInput, setFocusedInput, focusedInputRef] = useState(null)
    const [postsNumber, setPostsNumber, postsNumberRef] = useState(0)
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const [postContainer, setPostContainer, postContainerRef] = useState("")
    const [link, setLink] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    var x = new DOMParser().parseFromString(location.state.url, "text/html");
    let checkInterval;
    let toChange = ""
    
    function onClOUD() {
        var myIFrame = document.getElementById("iframe");
            var links = myIFrame.contentWindow.document.getElementsByTagName("a");
            for (var index = 0; index < links.length; index++) {
                links[index].removeAttribute('href');
            }
        var iframeDoc = document.getElementById("iframe").contentDocument;
        var s = iframeDoc.createElement("script")
        s.innerHTML = ``
        s.type = 'text/javascript';
        var s2 = iframeDoc.createElement('script');
        s2.type = 'text/javascript';
        s2.innerHTML = `
        !function(){class t{constructor(t){this.hoverBox=document.createElement("div"),this.hoverBox.style.position="absolute",this.hoverBox.style.pointerEvents="none";const e={...{container:document.body,selectors:"*",background:"rgba(153, 235, 255, 0.5)",borderWidth:5,transition:"all 150ms ease",ignoreElements:[document.body],action:{}},...t};Object.keys(e).forEach(t=>{this[t]=e[t]}),this._detectMouseMove=(t=>{this._previousEvent=t;let e=t.target;if(-1===this.ignoreElements.indexOf(e)&&e.matches(this.selectors)&&this.container.contains(e)||e===this.hoverBox){if(e===this.hoverBox){const i=document.elementsFromPoint(t.clientX,t.clientY)[1];if(this._previousTarget===i)return;e=i}else this._previousTarget=e;const i=e.getBoundingClientRect(),o=i.height,s=i.width;this.hoverBox.style.width=s+2*this.borderWidth+"px",this.hoverBox.style.height=o+2*this.borderWidth+"px",this.hoverBox.style.top=i.top+window.scrollY-this.borderWidth+"px",this.hoverBox.style.left=i.left+window.scrollX-this.borderWidth+"px",this._triggered&&this.action.callback&&(this.action.callback(e),this._triggered=!1)}else this.hoverBox.style.width=0}),document.addEventListener("mousemove",this._detectMouseMove)}get container(){return this._container}set container(t){if(!(t instanceof HTMLElement))throw new Error("Please specify an HTMLElement as container!");this._container=t,this.container.appendChild(this.hoverBox)}get background(){return this._background}set background(t){this._background=t,this.hoverBox.style.background=this.background}get transition(){return this._transition}set transition(t){this._transition=t,this.hoverBox.style.transition=this.transition}get borderWidth(){return this._borderWidth}set borderWidth(t){this._borderWidth=t,this._redetectMouseMove()}get selectors(){return this._selectors}set selectors(t){this._selectors=t,this._redetectMouseMove()}get ignoreElements(){return this._ignoreElements}set ignoreElements(t){this._ignoreElements=t,this._redetectMouseMove()}get action(){return this._action}set action(t){if(!(t instanceof Object))throw new Error("action must be an object!");if("string"==typeof t.trigger&&"function"==typeof t.callback)this._triggerListener&&(document.removeEventListener(this.action.trigger,this._triggerListener),this._triggered=!1),this._action=t,this._triggerListener=(()=>{this._triggered=!0,this._redetectMouseMove()}),document.addEventListener(this.action.trigger,this._triggerListener);else if(void 0!==t.trigger||void 0!==t.callback)throw new Error("action must include two keys: trigger (String) and callback (function)!")}_redetectMouseMove(){this._detectMouseMove&&this._previousEvent&&this._detectMouseMove(this._previousEvent)}}"undefined"!=typeof module&&void 0!==module.exports?module.exports=t:window.ElementPicker=t}();
//# sourceMappingURL=ElementPicker.js.map
        var selected = ""
        !function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.name=e()}}(function(){return function(){function e(t,n,r){function i(u,a){if(!n[u]){if(!t[u]){var f="function"==typeof require&&require;if(!a&&f)return f(u,!0);if(o)return o(u,!0);var l=new Error("Cannot find module '"+u+"'");throw l.code="MODULE_NOT_FOUND",l}var p=n[u]={exports:{}};t[u][0].call(p.exports,function(e){return i(t[u][1][e]||e)},p,p.exports,e,t,n,r)}return n[u].exports}for(var o="function"==typeof require&&require,u=0;u<r.length;u++)i(r[u]);return i}return e}()({1:[function(e,t,n){e("./src/listener")},{"./src/listener":2}],2:[function(e,t,n){function r(e,t){i++,o.push(e),setTimeout(function(){i>1?(o.shift(),i--):(t(o[0]),o=[],i=0)},50)}e("./main");var i=0,o=[];"undefined"!=typeof HTMLElement&&HTMLElement&&(HTMLElement.prototype.catchSingleEvent=function(e,t){this.addEventListener(e,function(e){r(e,function(e){t(e)})})}),"undefined"!=typeof SVGSVGElement&&SVGSVGElement&&(SVGSVGElement.prototype.catchSingleEvent=function(e,t){this.addEventListener(e,function(e){r(e,function(e){t(e)})})})},{"./main":3}],3:[function(e,t,n){function r(e,t){var n=document.querySelectorAll(t);return!(!n.length||1!==n.length||n[0]!==e)}function i(e){var t=e.getAttribute("href");if(t){if("#"===t)return null;if(t.match("\\?")){var n=t.split("?",1);return e.tagName+'[href*="'+n[0]+'"]'}return e.tagName+'[href="'+t+'"]'}return null}function o(e,t){for(var n=null,r=0;r<t.length;r++){var i=e.getAttribute(t[r]);if(i){var o=i.replace(new RegExp("'","g"),"\\'");n=e.tagName+"["+t[r]+'="'+o+'"]';break}}return n}function u(e,t){for(var n=null,i=0;i<t.length;i++){var o=e.getAttribute(t[i]);if(o)var u=o.replace(new RegExp("'","g"),"\\'"),a=e.tagName+"["+t[i]+'="'+u+'"]';if(a&&r(e,a)){n=a;break}}return n}function a(e){for(var t=e;t.parentElement;){if("BUTTON"===t.parentElement.tagName||"A"===t.parentElement.tagName){e=t.parentElement;break}t=t.parentElement}return e}function f(e){for(var t=1,n=e;n.previousElementSibling;)t++,n=n.previousElementSibling;return t}function l(e,t){for(var n=e,i="";n;){var u=o(n,t);if(u)i=u+i;else{var a=f(n);i=a>1?n.tagName+":nth-child("+a+")"+i:n.tagName+i}if(r(e,i)){n=null;break}if(n.parentElement&&"BODY"!==n.parentElement.tagName&&"HTML"!==n.parentElement.tagName)i=" > "+i,n=n.parentElement;else{if(n.parentElement&&"BODY"===n.parentElement.tagName){i="BODY > "+i,n=null;break}if(n.parentElement&&"HTML"===n.parentElement.tagName){i="HTML > "+i,n=null;break}n=null}}return i.toString()}function p(e,t,n,r){var o=[],f=e,p=["name","id","type","action","for","src","alt","data-tl-id","data-id","aria-label"];n&&Array.isArray(n)&&(p=n),r&&(f=a(f));var c=i(f),m=u(f,p),s=l(f,p),d=l(f,[]),g=l(f,["id","name"]);return c&&o.push(c),m&&o.push(m),s&&o.indexOf(s)<0&&o.push(s),d&&o.indexOf(d)<0&&o.push(d),g&&o.indexOf(g)<0&&o.push(g),t?o:o[0]}function c(e,t){return p(this,!0,e,t)}function m(e,t){return p(this,!1,e,t)}"undefined"!=typeof HTMLElement&&HTMLElement&&(HTMLElement.prototype.getSelectors=function(e,t){return p(this,!0,e,t)},HTMLElement.prototype.getSelector=function(e,t){return p(this,!1,e,t)}),"undefined"!=typeof SVGSVGElement&&SVGSVGElement&&(SVGSVGElement.prototype.getSelectors=function(e,t){return p(this,!0,e,t)},SVGSVGElement.prototype.getSelector=function(e,t){return p(this,!1,e,t)}),t.exports={getSelectors:c,getSelector:m}},{}]},{},[1])(1)});
        window.onload = function() {
            
         
            document.body.addEventListener("beforeunload", (event) => {event.preventDefault()});
        };
        
        const generateSelector = (target) => {
            const selectorPath = [];
 
            while (target.tagName) {
                let i = 0;
 
                if (target.parentNode) {
                    const children = target.parentNode.children;
 
                    while (i < children.length && children[i] !== target) {
                        i++;
                    }
                }
 
                selectorPath.unshift(target.nodeName +
                    (i > 0 ? \`:nth-child(\${i + 1})\` : ''));
                target = target.parentNode;
            }
 
            return selectorPath.join(' > ');
        }
        var cssPath = function(el) {
            if (!(el instanceof Element)) 
                return;
            var path = [];
            while (el.nodeType === Node.ELEMENT_NODE) {
                var selector = el.nodeName.toLowerCase();
                if (el.id) {
                    selector += '#' + el.id;
                    path.unshift(selector);
                    break;
                }
                path.unshift(selector);
                el = el.parentNode;
            }
            return path.join(" > ");
         }
         
        function fun() { new ElementPicker({
            container: document.body,
            selectors: "*",
            background: "rgba(153, 235, 255, 0.5)",
            borderWidth: 5,
            transition: "all 150ms ease",
            action: {
              trigger: "click",
              callback: (function (target) {
                  target.classList.toggle("highlight");
                  selected = cssPath(target)
              })
            }
            }) }`;
        iframeDoc.head.appendChild(s);
        iframeDoc.head.appendChild(s2);
        setInterval(() => {
            window.frames[0].frameElement.contentWindow.fun()
            setActive(false)
        }, 2000)
        let pointerValue = ""
        checkInterval = setInterval(() => {
            /*console.log(focusedInputRef.current)*/
            if (pointerValue != window.frames[0].frameElement.contentWindow.selected) {
                pointerValue = window.frames[0].frameElement.contentWindow.selected
                if (focusedInputRef.current == "container") {
                    setPostContainer(pointerValue)
                    setPostsNumber(x.querySelectorAll(pointerValue).length)
                    console.log("container set")
                }
                if (focusedInputRef.current == "link") {
                    if (postContainer.includes(pointerValue)) {
                        setLink(pointerValue)
                    } else {
                        enqueueSnackbar('Title should be in the container')
                    }
                    
                }
                if (focusedInputRef.current == "title") {
                    if (pointerValue.includes(postContainerRef.current)) {
                        setTitle(pointerValue)
                        console.log("title set")
                    } else {
                        enqueueSnackbar('Title should be in the container', {
                            autoHideDuration: 2000
                        })
                    }
                }
                if (focusedInputRef.current == "description") {
                    if (pointerValue.includes(postContainerRef.current)) {
                        setDescription(pointerValue)
                        console.log("desc set")
                    } else {
                        enqueueSnackbar('Description should be in the container', {
                            autoHideDuration: 2000
                        })
                    }
                }
            }
        }, 1000)
      }
      const sendSelectors = () => {
        setActive(true)
        axios.post("https://us-central1-rssfeeder-2f1c0.cloudfunctions.net/scrape/selectors", {
            postContainer,
            link,
            title,
            description,
            url: location.state.urlLink,
            user: currentUser.uid
        })
        .then(function (response) {
            console.log(response);
            setActive(false)
            navigate("/success", {state: {id: response.data}});
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    
    useEffect(() => {
        return () => clearInterval(checkInterval);;
      }, []);
  return (
    <LoadingOverlay
      active={isActive}
      spinner
      text='Loading'
    >
    <div>
        <div class="wrapper">
            <aside className='bg-gray-100'>
                <label className="block text-sm mb-1" htmlFor="emailinput">Post Container: {postsNumber} detected</label>
                <input className="form-input" value={postContainer}/>
                <button className='btn btn-primary' style={{width: "100%"}} onClick={() => {setFocusedInput("container")}}>Change</button>
                <br/><br/>
                {/*<label className="block text-sm mb-1" htmlFor="emailinput">Link</label>
                <input className="form-input" value={link}/>
                <button className='btn btn-primary' style={{width: "100%"}} onClick={() => {setFocusedInput("link")}}>Change</button>
                <br/>*/}
                <br/><hr/><br/><br/>
                <label className="block text-sm mb-1" htmlFor="emailinput">Title</label>
                <input className="form-input" value={title}/>
                <button className='btn btn-primary' style={{width: "100%"}} onClick={() => {setFocusedInput("title")}}>Change</button>
                <br/><br/>
                <label className="block text-sm mb-1" htmlFor="emailinput">Description</label>
                <input className="form-input" value={description}/>
                <button className='btn btn-primary' style={{width: "100%"}} onClick={() => {setFocusedInput("description")}}>Change</button>
                <br/>
                <br/>
                <br/>
                <br/>
                <button className='btn bg-white' style={{width: "100%"}} onClick={() => {sendSelectors()}}>Create your feed</button>
            </aside>
            <div id="mainContent" style={{height: "90vh"}}>
                <iframe onLoad={() => onClOUD()} id="iframe" style={{width: "100%", height: "100%"}} srcdoc={location.state.url.replace("'", '"')}></iframe>
            </div> 
        </div>
    </div>
    </LoadingOverlay>
  )
}

export default Selector