import React from "react";

const StickyScrollSection = () => {

  return (
    <div>
      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 1400px) and (max-width: 1700px) and (max-height: 950px) {
          .resolution-1600x900 .heading-text {
            font-size: 1.875rem !important;
            line-height: 1.0 !important;
            max-width: 420px !important;
          }
          .resolution-1600x900 .paragraph-text {
            font-size: 0.875rem !important;
            line-height: 1.3 !important;
            max-width: 450px !important;
          }
          .resolution-1600x900 .section-spacing {
            gap: 2rem !important;
          }
          .resolution-1600x900 .block-spacing {
            gap: 0.75rem !important;
          }
          .resolution-1600x900.container-spacing {
            min-height: 70vh !important
          }
          .resolution-1600x900 .main-container {
            min-height: 70vh !important;
          }
        }
      `}} />
{/* ---------------- DESKTOP VERSION ---------------- */}
      {/* Combined Section with both contents and images side by side */}
      <div className="resolution-1600x900 container-spacing max-lg:hidden w-full min-h-screen px-6 xl:px-[100px] 2xl:px-[400px] flex items-center">
        <div className="main-container w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Text content */}
          <div className="resolution-1600x900 section-spacing space-y-16 lg:space-y-20 xl:space-y-24 flex flex-col justify-center">
            {/* First content block */}
            <div className="block-spacing space-y-4 lg:space-y-5 xl:space-y-6">
              <h2 className="heading-text text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-manrope font-bold text-black leading-[1.1] lg:leading-tight xl:leading-tight max-w-[90%] lg:max-w-[85%] xl:max-w-full">
                The Biggest Challenge for Modern Enterprises is Mastering Complexity
              </h2>
              <p className="paragraph-text text-sm sm:text-base lg:text-lg xl:text-2xl font-inter font-normal text-black/70 leading-[1.4] lg:leading-relaxed max-w-[95%] lg:max-w-[90%] xl:max-w-full">
                Businesses today must innovate faster, deliver seamless customer experiences, and scale efficiently while navigating dynamic markets and evolving technologies.
              </p>
            </div>
            
            {/* Second content block */}
            <div className="block-spacing space-y-4 lg:space-y-5 xl:space-y-6">
              <h2 className="heading-text text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-manrope font-bold text-black leading-[1.1] lg:leading-tight xl:leading-tight max-w-[90%] lg:max-w-[85%] xl:max-w-full">
                Our Key to Unlock the Future: The Agentic Business Blueprint (ABB)
              </h2>
              <p className="paragraph-text text-sm sm:text-base lg:text-lg xl:text-2xl font-inter font-normal text-black/70 leading-[1.4] lg:leading-relaxed max-w-[95%] lg:max-w-[90%] xl:max-w-full">
                The Agentic Business Blueprint (ABB) is our framework to align business goals with adaptive strategies, agentic intelligence, and automation.
              </p>
            </div>
          </div>
          
          {/* Right side - Images stacked vertically */}
          <div className="flex flex-col justify-center -mt-6">
            <img
              src="/images/Container.png"
              alt="Visual 1"
              className="w-full max-w-[800px] h-auto rounded-[22px]"
            />
            <img
              src="/images/Container_2.png"
              alt="Visual 2"
              className="w-full max-w-[800px] h-auto rounded-[22px] -ml-0.5 -mt-1"
            />
          </div>
        </div>
      </div>

{/* ---------------- TABLET VERSION ---------------- */}
      {/* Tablet Layout - Content then images */}
      <div className="hidden sm:flex lg:hidden flex-col w-full min-h-screen px-6 justify-center">
        {/* First content block */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-manrope font-bold text-black leading-tight mb-6">
            The Biggest Challenge for Modern Enterprises is Mastering Complexity
          </h2>
          <p className="text-lg md:text-xl font-inter font-normal text-black/70 leading-relaxed">
            Businesses today must innovate faster, deliver seamless customer experiences, and scale efficiently while navigating dynamic markets and evolving technologies.
          </p>
        </div>
        
        {/* First image */}
        <img
          src="/images/Container.png"
          alt="Visual 1"
          className="w-full max-w-[600px] mx-auto h-auto rounded-[22px]"
        />
        
        {/* Second image - continuous with first */}
        <img
          src="/images/Container_2.png"
          alt="Visual 2"
          className="w-full max-w-[600px] mx-auto h-auto rounded-[22px] -mt-1 mb-8 ml-14"
        />
        
        {/* Second content block */}
        <div>
          <h2 className="text-2xl md:text-3xl font-manrope font-bold text-black leading-tight mb-6">
            Our Key to Unlock the Future: The Agentic Business Blueprint (ABB)
          </h2>
          <p className="text-lg md:text-xl font-inter font-normal text-black/70 leading-relaxed">
            The Agentic Business Blueprint (ABB) is our framework to align business goals with adaptive strategies, agentic intelligence, and automation.
          </p>
        </div>
      </div>


{/*  ---------------- MOBILE VERSION ---------------- */}
      {/* Combined Mobile Section */}
      <div className="flex flex-col sm:hidden px-6 min-h-screen justify-center">
        {/* First content block */}
        <div className="mb-8">
          <h2 className="text-2xl font-manrope font-bold mb-6">
            The Biggest Challenge for Modern Enterprises is Mastering Complexity
          </h2>
          <p className="text-base font-inter text-black/70 mb-6">
            Businesses today must innovate faster, deliver seamless customer experiences, and scale efficiently while navigating dynamic markets and evolving technologies.
          </p>
        </div>
        
        {/* First image */}
        <img
          src="/images/Container.png"
          alt="Visual 1"
          className="w-full h-auto rounded-[22px]"
        />
        
        {/* Second image - immediately following first */}
        <img
          src="/images/Container_2.png"
          alt="Visual 2"
          className="w-full h-auto rounded-[22px] mb-8 -mt-1 -ml-0.5"
        />
        
        {/* Second content block */}
        <div>
          <h2 className="text-2xl font-manrope font-bold mb-6">
            Our Key to Unlock the Future: The Agentic Business Blueprint (ABB)
          </h2>
          <p className="text-base font-inter text-black/70">
            The Agentic Business Blueprint (ABB) is our framework to align business goals with adaptive strategies, agentic intelligence, and automation.
          </p>
        </div>
      </div>


    </div>
   
  );
};

export default StickyScrollSection;