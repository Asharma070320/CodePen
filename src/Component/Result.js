import React from 'react'

function Result({srcCode}) {
    return (
        <div style={{width:'98vw'}}>
            <div style={{color:'white',marginLeft:'17px'}}  className="bg-[#282c34] p-4 shadow mt-4 rounded-lg">
                <h2 
                    className="text-lg font-semibold mb-2 text-white">
                    Result
                </h2>
                <iframe style={{background:'white'}}
                    className="w-full h-60 border border-gray-700 rounded-md"
                    srcDoc={srcCode}
                    title="output"
                    sandbox="allow-scripts"
                    width="100%"
                    height="100%"
                >
                </iframe>
            </div>
        </div>
    )
}

export default Result