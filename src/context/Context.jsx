/*import { createContext } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const onSent = async (prompt) =>{
       await run(prompt)
    }

    onSent("what is react.js")


    const contextValue ={


    }

    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider


import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [response, setResponse] = useState("");

    const onSent = async (prompt) => {
        try {
            const result = await run(prompt);
            setResponse(result); // Store response in state
        } catch (error) {
            console.error("Error fetching AI response:", error);
        }
    };

    const contextValue = {
        response,
        onSent, // Expose this function to components
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;


import { createContext, useState, useEffect } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input,setInput] = useState("");
    const [ recentPrompt, setRecentPromt ] = useState("");
    const [prevPrompts, setPrevPrompts] = useState("");
    const [showResult, setShowResult] = useState("");
    const [loading, setLoading] =useState("");
    const [resultData, setResultData] = useState("");



    const onSent = async (prompt) => {
        try {
            setResultData("")
            setLoading(true)
            setShowResult(true)
            const result = await run(input);
            setResultData(result); 
            setLoading(false)
            setInput("")
            console.log("API Response:", result); 
        } catch (error) {
            console.error("Error fetching AI response:", error);
        }
    };

     
    useEffect(() => {
        onSent("What is React?");
    }, []); 

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent, 
        setRecentPromt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput
       
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;


import { createContext, useState, useEffect } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState(null);

    const delayPara = ({index, nextWord})=>{
          setTimeout(function (){
            setResultData(prev => prev+nextWord);
          },75*index)
    };

    const onSent = async () => { // ✅ Removed extra closing bracket here
        try {
            setResultData("")
            setLoading(true)
            setShowResult(true)
            setRecentPrompt(input)
            const response = await run(input);
            let responseArray = response.split("**");
            let newResponse;
            for(let i= 0; i<responseArray.length; i++)
            {
                if(i=== 0 || i%2 !== 1){
                    newResponse += responseArray[i];
                }
                else{
                    newResponse += "<b>"+ responseArray[i] + "</b>";
                }
            }
            let newResponse2 = newResponse.split("*").join("</br>") 
            let newResponseArray = newResponse2.split(" ");
            for(let i=0; i<newResponseArray.length; i++)
                {
                    const nextWord = newResponseArray[i];
                    delayPara(i,nextWord + "")
                } 
            setLoading(false)
            setInput("")
            console.log("API Response:", response); 
        } catch (error) {
            console.error("Error fetching AI response:", error);
        }
    }; //  Function correctly closed here

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent, 
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
*/

import { createContext, useState, useEffect } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData(prev => (prev ? prev + " " : "") + nextWord);
        }, 75 * index);
    };

    const newChat = () =>{
        setLoading(false)
        setShowResult(false)
    }

    const onSent = async (prompt) => { 
        try {
            setResultData(""); 
            setLoading(true);
            setShowResult(true);
            let response;

           // Always store the prompt in prevPrompts
        if (prompt !== undefined) {
            setPrevPrompts(prev => (prev.includes(prompt) ? prev : [...prev, prompt])); // ✅ Save even if prompt is provided
            setRecentPrompt(prompt);
            response = await run(prompt);
        } else {
            setPrevPrompts(prev => (prev.includes(prompt) ? prev : [...prev, prompt]));
            setRecentPrompt(input);
            response = await run(input);
        }

            let responseArray = response.split("**");
            let newResponse = "";

            for (let i = 0; i < responseArray.length; i++) {
                if (i === 0 || i % 2 !== 1) {
                    newResponse += responseArray[i];
                } else {
                    newResponse += "<b>" + responseArray[i] + "</b>";
                }
            }

            let newResponse2 = newResponse.replace(/\*/g, "<br/>");
            let newResponseArray = newResponse2.split(" ");

            setResultData(""); // Ensure resultData is not undefined before updating

            for (let i = 0; i < newResponseArray.length; i++) {
                const nextWord = newResponseArray[i];
                delayPara(i, nextWord);
            } 

            setLoading(false);
            setInput("");
            console.log("API Response:", response);
        } catch (error) {
            console.error("Error fetching AI response:", error);
        }
    };

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent, 
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;

