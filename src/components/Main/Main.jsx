/*import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {

   const {onSent , recentPrompt, showResult, loading, resultData, setInput, input} = useContext(Context)


  return (
    <div className='main'>
        <div className="nav">
            <p>Gemini</p>
            <img src={assets.user_icon} alt=''/>
        </div>
        <div className="main-container">

           {!showResult
           ?<>
            <div className="greet">
                <p><span>Hello, Dev.</span></p>
                <p>How Can I Help You Today?</p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>Suggest beautiful places to see on upcoming Road Trip</p>
                    <img src={assets.compass_icon} alt='' />
                </div>
                <div className="card">
                    <p>Briefly Summarize this concept: Urban Planning</p>
                    <img src={assets.bulb_icon} alt='' />
                </div>
                <div className="card">
                    <p>Brainstorm team bonding activties for our work retreat</p>
                    <img src={assets.message_icon} alt='' />
                </div>
                <div className="card">
                    <p>Improve the readability of the following code</p>
                    <img src={assets.code_icon} alt='' />
                </div>
            </div>
           </>
           : <div className="results">
               <div className="result-title">
                  <img src={assets.user_icon} alt='' />
                  <p>{recentPrompt}</p>
               </div>
               <div className="result-data">
                <img src={assets.gemini_icon} alt='' />
                <p dangerouslySetInnerHTML={{__html:resultData}}> </p>
               </div>
           </div>
           }


            

            <div className="main-bottom">
                <div className="search-box">
                    <input  onChange={(e)=>setInput(e.target.value)}  value={input} type='text' placeholder='Enter a Promt here'/>
                    <div>
                        <img src={assets.gallery_icon} alt=''/>
                        <img src={assets.mic_icon} alt=''/>
                        <img onClick={()=>onSent()}  src={assets.send_icon} alt=''/>
                    </div>
                </div>
                <p className='bottom-info'>  
                    Gemini may display inaccurate info, including about people, so double check its responses. your privacy and Gemini Apps
                </p>
            </div>
        </div>
    </div>
  )
}

export default Main

*/

import React, { useContext } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Main = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

    return (
        <div className='main'>
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt='' />
            </div>
            <div className="main-container">
                {!showResult ? (
                    <>
                        <div className="greet">
                            <p><span>Hello, Dev.</span></p>
                            <p>How Can I Help You Today?</p>
                        </div>
                        <div className="cards">
                            <div className="card">
                                <p>Suggest beautiful places to see on an upcoming Road Trip</p>
                                <img src={assets.compass_icon} alt='' />
                            </div>
                            <div className="card">
                                <p>Briefly Summarize this concept: Urban Planning</p>
                                <img src={assets.bulb_icon} alt='' />
                            </div>
                            <div className="card">
                                <p>Brainstorm team bonding activities for our work retreat</p>
                                <img src={assets.message_icon} alt='' />
                            </div>
                            <div className="card">
                                <p>Improve the readability of the following code</p>
                                <img src={assets.code_icon} alt='' />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="results">
                        <div className="result-title">
                            <img src={assets.user_icon} alt='' />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt='' />
                            {loading 
                            ?<div className='loader'>
                               <hr />
                               <hr />
                               <hr />
                            </div> 
                              :<p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                              
                            }
                        </div>
                    </div>
                )}

                <div className="main-bottom">
                    <div className="search-box">
                        <input 
                            onChange={(e) => setInput(e.target.value)} 
                            value={input} 
                            type='text' 
                            placeholder='Enter a prompt here' 
                        />
                        <div>
                            <img src={assets.gallery_icon} alt='' />
                            <img src={assets.mic_icon} alt='' />
                     {input ? <img 
                                onClick={() => {
                                    if (!input.trim()) return; // Prevent empty input submission
                                    onSent(input);
                                }}  
                                src={assets.send_icon} 
                                alt=''
                            />  : null}
                        </div>
                    </div>
                    <p className='bottom-info'>  
                        Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Main;
