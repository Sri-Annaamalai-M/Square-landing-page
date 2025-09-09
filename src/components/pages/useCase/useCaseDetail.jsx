import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Briefcase, BarChart2, Zap, BrainCircuit, ArrowLeft } from 'lucide-react';
import UseCaseCard from '../../../components/common/UseCaseCard';

// Helper component for list items in the main content
const ListItem = ({ children }) => (
    <li className="flex items-start">
        <span aria-hidden="true" className="w-1 h-1 bg-gray-600 mr-3 mt-[16px] flex-shrink-0"></span>
        <span className="text-sm sm:text-base mt-1">{children}</span>
    </li>
);

// Main App Component
export default function UseCaseDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [useCaseData, setUseCaseData] = useState(null);
    const [relatedUseCases, setRelatedUseCases] = useState([]);
    const [activeSection, setActiveSection] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visibleElements, setVisibleElements] = useState(new Set());
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);

    useEffect(() => {
        const fetchUseCaseData = async () => {
            try {
                const response = await fetch('/usecases.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch use case data');
                }
                const data = await response.json();

                const currentUseCase = data[id];
                if (!currentUseCase) {
                    throw new Error('Use case not found');
                }

                setUseCaseData(currentUseCase);

                // Set the first section as active by default
                if (currentUseCase.sections && currentUseCase.sections.length > 0) {
                    setActiveSection(currentUseCase.sections[0].id);
                }

                // Get related use cases
                const related = currentUseCase.relatedUseCases?.map(relatedId => data[relatedId]).filter(Boolean) || [];
                setRelatedUseCases(related);

                // Scroll to top when new page loads
                window.scrollTo({ top: 0, behavior: 'smooth' });

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            // Reset states when navigating to a new use case
            setUseCaseData(null);
            setRelatedUseCases([]);
            setActiveSection('');
            setVisibleElements(new Set());
            setImageLoaded(false);
            setImageLoading(true);
            setLoading(true);
            setError(null);

            fetchUseCaseData();
        }
    }, [id]);

    // Intersection Observer to track which section is in view
    useEffect(() => {
        if (!useCaseData?.sections) return;

        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        useCaseData.sections.forEach(section => {
            const element = document.getElementById(section.id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            useCaseData.sections.forEach(section => {
                const element = document.getElementById(section.id);
                if (element) {
                    observer.unobserve(element);
                }
            });
        };
    }, [useCaseData]);

    // Scroll animation observer
    useEffect(() => {
        const animationObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleElements(prev => new Set([...prev, entry.target.id]));
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        // Observe all animatable elements
        const elementsToAnimate = document.querySelectorAll('.fade-in-element');
        elementsToAnimate.forEach(el => {
            if (el.id) {
                animationObserver.observe(el);
            }
        });

        return () => {
            elementsToAnimate.forEach(el => {
                if (el.id) {
                    animationObserver.unobserve(el);
                }
            });
        };
    }, [useCaseData]);

    // Ensure first section is visible and active on page load
    useEffect(() => {
        if (useCaseData?.sections && activeSection) {
            // Small delay to ensure page is rendered
            setTimeout(() => {
                setVisibleElements(prev => new Set([...prev, 'hero-section', activeSection]));
            }, 100);
        }
    }, [useCaseData, activeSection]);

    const handleNavClick = (sectionId) => {
        setActiveSection(sectionId);
        const element = document.getElementById(sectionId);
        if (element) {
            // Get the current scroll position
            const startPosition = window.pageYOffset;
            const targetPosition = element.offsetTop - 100; // 100px offset from top
            const distance = targetPosition - startPosition;
            const duration = 1500; // 1.5 seconds for slower animation
            let start = null;

            // Easing function for smooth animation
            const easeInOutCubic = (t) => {
                return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
            };

            // Animation function
            const animateScroll = (timestamp) => {
                if (!start) start = timestamp;
                const elapsed = timestamp - start;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = easeInOutCubic(progress);

                window.scrollTo(0, startPosition + distance * easedProgress);

                if (progress < 1) {
                    requestAnimationFrame(animateScroll);
                }
            };

            // Start the animation
            requestAnimationFrame(animateScroll);
        }
    };

    const handleLearnMore = (useCaseId) => {
        navigate(`/usecase/${useCaseId}`);
    };

    const handleImageLoad = () => {
        setImageLoading(false);
        setImageLoaded(true);
    };

    const handleImageError = (e) => {
        setImageLoading(false);
        e.target.style.display = 'none';
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Error: {error}</h1>
                    <button
                        onClick={() => navigate('/usecase')}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Back to Use Cases
                    </button>
                </div>
            </div>
        );
    }

    if (!useCaseData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-600 mb-4">Use case not found</h1>
                    <button
                        onClick={() => navigate('/usecase')}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Back to Use Cases
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen mt-20  font-sans text-gray-800"
            style={{
                background: 'linear-gradient(180deg, #aab6e240 0px, #c2cce730 100px, #ffffffff 200px)'
            }}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">


                <div className="flex flex-col lg:flex-row lg:space-x-8 xl:space-x-12">
                    {/* Left Sidebar Navigation - Updated to match UseCase component */}
                    <aside className="w-full lg:w-72 mb-8 lg:mb-0">
                        <div className="sticky top-4 lg:top-12">
                            <div className="flex flex-col w-full items-start gap-4">
                                {useCaseData.sections.map((section, index) => (
                                    <button
                                        key={section.id}
                                        onClick={() => handleNavClick(section.id)}
                                        className={`flex items-center justify-start gap-2.5 pl-4 pr-6 py-5 md:py-7 w-full rounded-2xl overflow-hidden focus:outline-none focus:ring-0 focus:border-none focus-visible:outline-none focus-visible:ring-0 active:outline-none active:ring-0 border-none outline-none transition-all duration-500 ease-out ${activeSection === section.id ? "bg-[#e6edfc]" : "bg-transparent"
                                            } ${useCaseData ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                            }`}
                                        style={{
                                            outline: 'none',
                                            border: 'none',
                                            boxShadow: 'none',
                                            transitionDelay: `${index * 100}ms`
                                        }}
                                    >
                                        <div
                                            className={`font-Manrope font-semibold text-base md:text-lg tracking-[-0.60px] leading-6 whitespace-nowrap text-left ${activeSection === section.id ? "text-[#064EE3]" : "text-[#04040469]"
                                                }`}
                                        >
                                            {section.title}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="w-full lg:w-4/5">
                        <div className="space-y-8 sm:space-y-10 lg:space-y-12">
                            <div id="hero-section" className={`fade-in-element transition-all duration-1000 ease-out ${visibleElements.has('hero-section')
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-8'
                                }`}>
                                <p className="text-xs sm:text-xs font-semibold px-2 sm:px-2 text-black tracking-wider mb-2 sm:mb-3 bg-[#C5EDE0] rounded-full py-1 w-fit font-family-Sora">
                                    {useCaseData.category} Use Case
                                </p>
                                <h1 className="text-[42px] font-bold text-blue-600 leading-tight">
                                    {useCaseData.heroTitle}
                                </h1>

                                {/* Display the use case image */}
                                {useCaseData.image && (
                                    <div className="mt-6 mb-6">
                                        <div className="w-full max-w-6xl mx-auto relative">
                                            {/* Loading skeleton */}
                                            {imageLoading && (
                                                <div className="w-full h-64 sm:h-80 lg:h-96 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-lg shadow-lg">
                                                    <div className="flex items-center justify-center h-full">
                                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Actual image */}
                                            <img
                                                src={useCaseData.image}
                                                alt={useCaseData.title}
                                                className={`w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg shadow-lg transition-all duration-700 ease-out ${imageLoaded && !imageLoading
                                                        ? 'opacity-100 scale-100'
                                                        : 'opacity-0 scale-95'
                                                    } ${imageLoading ? 'absolute inset-0' : ''}`}
                                                onLoad={handleImageLoad}
                                                onError={handleImageError}
                                            />
                                        </div>
                                    </div>
                                )}

                                <p className="text-lg text-gray-700 mt-4">
                                    {useCaseData.description}
                                </p>
                            </div>

                            {/* Dynamic Diagram Section - Only for supply-chain */}
                            {useCaseData.id === 'supply-chain' && (
                                <div id="diagram-section" className={`fade-in-element p-4 sm:p-6 lg:p-8 relative overflow-hidden transition-all duration-1000 ease-out delay-200 ${visibleElements.has('diagram-section')
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 translate-y-8'
                                    }`}>
                                    <div className="flex flex-col sm:flex-row justify-between items-center relative z-10 space-y-6 sm:space-y-0">
                                        <div className="text-center w-full sm:w-1/3">
                                            <div className="mx-auto bg-white w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-md mb-3">
                                                <span className="text-xl sm:text-2xl font-bold text-gray-500">2.</span>
                                            </div>
                                            <h3 className="font-semibold text-gray-700 text-sm sm:text-base">Warehouse Automation</h3>
                                        </div>
                                        <div className="text-center w-full sm:w-1/3">
                                            <div className="mx-auto bg-white w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-md mb-3">
                                                <span className="text-xl sm:text-2xl font-bold text-gray-500">3.</span>
                                            </div>
                                            <h3 className="font-semibold text-gray-700 text-sm sm:text-base">Real-time Monitoring</h3>
                                        </div>
                                        <div className="text-center w-full sm:w-1/3">
                                            <div className="mx-auto bg-white w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-md mb-3">
                                                <span className="text-xl sm:text-2xl font-bold text-gray-500">4.</span>
                                            </div>
                                            <h3 className="font-semibold text-gray-700 text-sm sm:text-base">Timely Re-ordering</h3>
                                        </div>
                                    </div>
                                    <div className="hidden sm:block absolute top-1/2 left-0 w-full h-full z-0 transform -translate-y-3/4 mt-1">
                                        <svg width="100%" height="100" viewBox="0 0 800 100" preserveAspectRatio="none">
                                            <path d="M 130 60 C 250 60, 250 20, 400 20 S 550 60, 670 60" stroke="#cbd5e1" strokeWidth="4" fill="none" strokeDasharray="10 5" />
                                        </svg>
                                    </div>
                                </div>
                            )}

                            {/* Dynamic Text Sections */}
                            <article className="space-y-6 sm:space-y-8 lg:space-y-10 prose max-w-none prose-p:text-gray-600 prose-headings:text-gray-900">
                                {useCaseData.sections.map((section, index) => (
                                    <section
                                        key={section.id}
                                        id={section.id}
                                        className={`fade-in-element transition-all duration-1000 ease-out ${visibleElements.has(section.id)
                                                ? 'opacity-100 translate-y-0'
                                                : 'opacity-0 translate-y-8'
                                            }`}
                                        style={{ transitionDelay: `${(index + 1) * 200}ms` }}
                                    >
                                        <h2 className="text-lg mb-3 sm:text-xl font-semibold">{section.title}</h2>
                                        <p className="text-sm sm:text-base">{section.content}</p>

                                        {section.challenges && (
                                            <>
                                                <p className="text-sm sm:text-base">Key challenges include:</p>
                                                <ul className="space-y-2 mt-4 not-prose">
                                                    {section.challenges.map((challenge, index) => (
                                                        <ListItem key={index}>{challenge}</ListItem>
                                                    ))}
                                                </ul>
                                            </>
                                        )}

                                        {section.features && (
                                            <>
                                                <p className="text-sm sm:text-base">Our intelligent platform provides:</p>
                                                <ul className="space-y-2 mt-4 not-prose">
                                                    {section.features.map((feature, index) => (
                                                        <ListItem key={index}>{feature}</ListItem>
                                                    ))}
                                                </ul>
                                            </>
                                        )}

                                        {section.benefits && (
                                            <>
                                                <p className="text-sm sm:text-base">Key benefits:</p>
                                                <ul className="space-y-2 mt-4 not-prose">
                                                    {section.benefits.map((benefit, index) => (
                                                        <ListItem key={index}>{benefit}</ListItem>
                                                    ))}
                                                </ul>
                                            </>
                                        )}

                                        {section.additionalContent && (
                                            <p className="mt-4 text-sm sm:text-base">{section.additionalContent}</p>
                                        )}
                                    </section>
                                ))}
                            </article>
                        </div>
                    </main>
                </div>

                {/* Related Use Cases Section */}
                {relatedUseCases.length > 0 && (
                    <section
                        id="related-section"
                        className={`fade-in-element mt-12 sm:mt-16 lg:mt-20 transition-all duration-1000 ease-out delay-500 ${visibleElements.has('related-section')
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-8'
                            }`}
                    >
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
                            Other Use Cases
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                            {relatedUseCases.map((relatedCase, index) => (
                                <div
                                    key={relatedCase.id}
                                    className={`transition-all duration-700 ease-out ${visibleElements.has('related-section')
                                            ? 'opacity-100 translate-y-0'
                                            : 'opacity-0 translate-y-8'
                                        }`}
                                    style={{ transitionDelay: `${600 + index * 150}ms` }}
                                >
                                    <UseCaseCard
                                        useCase={relatedCase}
                                        onLearnMore={handleLearnMore}
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}