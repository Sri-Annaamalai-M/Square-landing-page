import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import CTASection from "../Home/CTASection";
import useCaseData from "../../data/usecase.json";
import UseCaseCard from "../../components/common/UseCaseCard";
import Button from "../../components/ui/Button";

// Main App component
export const UseCase = () => {
  const [activeCategory, setActiveCategory] = useState("supply-chain");
  const [showAllUseCases, setShowAllUseCases] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Dynamic data mapping
  const dataMapping = {
    "supply-chain": {
      data: Object.values(useCaseData).filter(
        (uc) => uc.category === "Supply Chain"
      ),
      categoryInfo: {
        id: "supply-chain",
        label: "Supply Chain",
        icon: "/icons/supply.svg",
      },
    },
    "information-technology": {
      data: Object.values(useCaseData).filter(
        (uc) => uc.category === "Technology"
      ),
      categoryInfo: {
        id: "information-technology",
        label: "Information Technology",
        icon: "/icons/it.svg",
      },
    },
    healthcare: {
      data: Object.values(useCaseData).filter(
        (uc) => uc.category === "Healthcare"
      ),
      categoryInfo: {
        id: "healthcare",
        label: "Healthcare",
        icon: "/icons/healthcare.svg",
      },
    },
    "human-resource": {
      data: Object.values(useCaseData).filter(
        (uc) => uc.category === "Human Resource"
      ),
      categoryInfo: {
        id: "human-resource",
        label: "Human Resource",
        icon: "/icons/humanresource.svg",
      },
    },
    insurance: {
      data: Object.values(useCaseData).filter(
        (uc) => uc.category === "Insurance"
      ),
      categoryInfo: {
        id: "insurance",
        label: "Insurance",
        icon: "/icons/humanresource.svg",
      },
    },
  };

  // Handle URL parameters to set active category
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get('category');
    
    if (categoryParam && dataMapping[categoryParam]) {
      setActiveCategory(categoryParam);
    }
    
    // Scroll to top when component mounts or category changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.search]);

  // Extract category filters dynamically from the data mapping
  const getCategoryFilters = () => {
    return Object.entries(dataMapping).map(([key, config]) => ({
      ...config.categoryInfo,
      isActive: activeCategory === key,
    }));
  };

  // Create use cases based on active category - UPDATED to include tagline
  const getCurrentUseCases = () => {
    const currentConfig = dataMapping[activeCategory];
    if (!currentConfig) return [];

    return currentConfig.data.map((useCase) => ({
      id: useCase.id,
      title: useCase.title,
      tagline: useCase.tagline, // Added tagline field
      description: useCase.summary || useCase.description,
      category: activeCategory,
      image: useCase.image,
    }));
  };

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    // Reset showAllUseCases when category changes
    setShowAllUseCases(false);
  };

  const handleViewAllClick = () => {
    setShowAllUseCases(true);
  };

  const handleShowLessClick = () => {
    setShowAllUseCases(false);
  };

  const handleLearnMoreClick = (useCaseId) => {
    navigate(`/usecase/${useCaseId}`);
  };

  // Get the use cases to display (first 4 by default, all if showAllUseCases is true)
  const currentUseCases = getCurrentUseCases();
  const useCasesToDisplay = showAllUseCases
    ? currentUseCases
    : currentUseCases.slice(0, 4);

  const categoryFilters = getCategoryFilters();

  return (
    <div className="bg-white min-h-screen w-full">
      {/* Hero Section - Full Width */}
      <div className="relative w-full h-auto min-h-[300px] md:min-h-[440px] overflow-hidden pt-20">
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: "url('/images/img_67c0570ea854203522bca87aherobgpatternavif.png')" }}
        />
        
        {/* Background blur effect */}
        <div className="absolute w-[300px] h-[300px] md:w-[470px] md:h-[470px] top-0 left-1/2 transform -translate-x-1/2 md:left-[485px] md:transform-none bg-[#1357e591] rounded-full blur-[400px]" />
        
        {/* Hero Content */}
        <section className="w-full bg-[linear-gradient(359deg,#ffffff_0%,_#e3ebff_100%)] relative">
          <div 
            className="w-full h-[300px] md:h-[440px] bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/HomeHero.png')" }}
          >
            <div className="w-full max-w-[300px] xs:max-w-[350px] sm:max-w-[400px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1300px] mx-auto px-3 xs:px-4 sm:px-5 lg:px-8 h-full">
              
              {/* Decorative border element */}
              <div className="absolute w-[60px] h-[60px] md:w-[88px] md:h-[83px] top-[40px] left-[20px] md:top-[84px] md:left-[39px] border-2 border-solid border-transparent shadow-[inset_-5px_-5px_250px_#ffffff05] backdrop-blur-[21px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(21px)_brightness(100%)] [border-image:linear-gradient(169deg,rgba(255,255,255,0.4)_0%,rgba(238,237,237,0.2)_100%)_1] [background:radial-gradient(50%_50%_at_0%_0%,rgba(255,255,255,0.4)_0%,rgba(255,255,255,0)_100%)]" />

              {/* Content Container */}
              <div className="flex flex-col justify-center items-center h-full text-center">
                <div className="max-w-6xl">
                  <h1 className="text-[32px] sm:text-[48px] md:text-[54px] lg:text-[54px] font-Manrope font-[700] leading-[40px] sm:leading-[56px] md:leading-[72px] lg:leading-[80px] text-center text-global-1 w-full">
                    <span className="text-global-1">Partnered Progress</span>
                    <span className="text-global-1 lg:text-[50px]"> : </span>
                    <span className="text-global-5 text-[#064EE3]">
                      Agentic AI
                    </span>
                    <br />
                    <span className="text-global-1">
                      Solution for Every Sector
                    </span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Main Content */}
      <div className="relative overflow-hidden">
        <div className="flex flex-col items-center gap-10 md:gap-20 px-4 md:px-8 lg:px-16 py-8 md:py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row w-full max-w-7xl items-start gap-6 lg:gap-6">
            {/* Category Filters */}
            <div className="flex flex-col w-full lg:w-72 items-start gap-4 mb-10 ">
              {categoryFilters.map((filter) => (
                <Button
                  key={filter.id}
                  variant="ghost"
                  onClick={() => handleCategoryClick(filter.id)}
                  className={`flex items-center justify-start gap-2.5 pl-4 pr-6 py-5 md:py-7 w-full rounded-2xl overflow-hidden focus:outline-none focus:ring-0 focus:border-none focus-visible:outline-none focus-visible:ring-0 active:outline-none active:ring-0 border-none outline-none ${
                    filter.isActive ? "bg-[#e6edfc]" : "bg-transparent"
                  }`}
                  style={{ outline: 'none', border: 'none', boxShadow: 'none' }}
                >
                  <img
                    className="w-6 h-6 md:w-8 md:h-8"
                    alt="Category icon"
                    src={filter.icon}
                    style={
                      filter.isActive
                        ? {
                            filter:
                              "brightness(0) saturate(100%) invert(25%) sepia(89%) saturate(3028%) hue-rotate(212deg) brightness(94%) contrast(90%)",
                          }
                        : {
                            filter:
                              "brightness(0) saturate(100%) invert(15%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(95%) contrast(95%)",
                            opacity: 0.41,
                          }
                    }
                  />

                  <div
                    className={`font-Manrope font-semibold text-base md:text-lg tracking-[-0.60px] leading-6 whitespace-nowrap text-left ${
                      filter.isActive ? "text-[#064EE3]" : "text-[#04040469]"
                    }`}
                  >
                    {filter.label}
                  </div>
                </Button>
              ))}
            </div>

            {/* Use Cases Grid */}
            <div className="flex flex-col w-full lg:w-[1000px] items-center justify-center gap-8 md:gap-10">
              {currentUseCases.length === 0 ? (
                // No Data State
                <div className="flex flex-col items-center justify-center min-h-[400px] w-full text-center">
                  <div className="w-24 h-24 mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-700 mb-2">
                    No Use Cases Available
                  </h3>
                  <p className="text-gray-500 max-w-md">
                    There are currently no use cases available for the selected
                    category. Please check back later or select a different
                    category.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full">
                    {useCasesToDisplay.map((useCase) => (
                      <UseCaseCard
                        key={useCase.id}
                        useCase={useCase}
                        onLearnMore={handleLearnMoreClick}
                      />
                    ))}
                  </div>

                  {!showAllUseCases && currentUseCases.length > 4 && (
                    <Button
                      onClick={handleViewAllClick}
                      className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-[80px] bg-[linear-gradient(90deg,rgba(6,78,227,1)_0%,rgba(61,118,236,1)_100%)] h-auto"
                    >
                      <div className="font-Manrope font-semibold text-white text-sm md:text-base text-center tracking-0 leading-6 whitespace-nowrap">
                        View All Use Cases
                      </div>
                    </Button>
                  )}

                  {showAllUseCases && currentUseCases.length > 4 && (
                    <Button
                      onClick={handleShowLessClick}
                      className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-[80px] bg-[linear-gradient(90deg,rgba(6,78,227,1)_0%,rgba(61,118,236,1)_100%)] h-auto"
                    >
                      <div className="font-Manrope font-semibold text-white text-sm md:text-base text-center tracking-0 leading-6 whitespace-nowrap">
                        Show Less
                      </div>
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>

          {/* CTA Section */}
          {/* <CTASection /> */}
        </div>
      </div>
    </div>
  );
};

export default UseCase;