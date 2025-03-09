import React from 'react';

export default function About() {
  return (
    <div className= "bg-bg">
        <div className ="flex flex-col justify-items-center relative">
            <img className = "absolute top-0 left-0"
            src="/cornerline.svg" alt="corner line" width={390} height={543}/>
            <img className="mx-auto mb-[-1rem]" src="/logo.svg" alt="Fujiplans Logo" width={636} height={244} />
            <h1 className="mx-auto mt-[-3rem] font-PJS font-bold text-xl md:text-2xl lg:text-3xl xl:text-6xl
            bg-gradient-to-r from-light-pink via-light-pink via-50% to-dark-yellow inline-block 
            bg-clip-text text-transparent">
                about us</h1>
        </div>
        <div className="flex flex-row">
            <div className="flex flex-col ml-[12.5rem] mt-[14rem]">
                <img className="absolute" 
                src="/win.png" width={600} height={500}/>
                <img className="mt-[-2rem] ml-[-1rem]" 
                src="/winblob.svg" width={610} height={500} />
                <p className = "font-PJS text-5xl mx-auto">Fall Demo Day  <span className="text-pink font-bold">Winners</span></p>
            </div>
            <div className="absolute right-0">
                <img src="/curlyarrow.svg" width={600} height={500}/>
            </div>
        </div>
        <div>
        </div>
    </div>
  );
}