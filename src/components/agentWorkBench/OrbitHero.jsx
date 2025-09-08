import React, { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { OrbitingCircles } from '../../components/ui/Orbiting-circles'
import LoginModal from '../../components/common/LoginDialog';
import SignUpModal from '../../components/common/SignUpDialog';

const OrbitHero = () => {
    const location = useLocation();
    const { category } = useParams();
    const [isSignUpOpen, setisSignUpOpen] = useState(false);
    const [activeButton, setActiveButton] = useState('Foundation Agents');

    useEffect(() => {
        if (category === 'foundation-agents') {
            setActiveButton('Foundation Agents');
        } else if (category === 'industry-specific-agents') {
            setActiveButton('Industry Solutions');
        } else if (location.pathname.includes('agent-workbench')) {
            setActiveButton('Foundation Agents');
        }
        const searchParams = new URLSearchParams(location.search);
        const contentType = searchParams.get('type');
        if (contentType === 'foundation') {
            setActiveButton('Foundation Agents');
        } else if (contentType === 'industry') {
            setActiveButton('Industry Solutions');
        } else if (contentType === 'customer') {
            setActiveButton('Customer Solutions');
        }
    }, [category, location]);

    const agentContent = {
        'Foundation Agents': {
            centerTitle: 'Foundation Agents',
            centerSubtitle: '1500+ AI Models Ready for You',
            items: [
                { icon: '/images/agents/database-management 1.png', title: 'Data\nManagement', alt: 'Data Management' },
                { icon: '/images/agents/regulatory 1.png', title: 'Compliance &\nSecurity', alt: 'Compliance & Security' },
                { icon: '/images/agents/online-analytical 1.png', title: 'Business\nIntelligence & Analysis', alt: 'Business Intelligence & Analysis' },
                { icon: '/images/agents/robot 1.png', title: 'Communication\n& Assistance', alt: 'Communication & Assistance' },
                { icon: '/images/agents/writing 1.png', title: 'Summarisation &\nContent Handling', alt: 'Summarisation & Content Handling' },
                { icon: '/images/agents/folders 1.png', title: 'Document &\nKnowledge Management', alt: 'Document & Knowledge Management' },
                { icon: '/images/agents/social-media 1.png', title: 'Social & Media', alt: 'Social & Media' },
                { icon: '/images/agents/efficiency 1.png', title: 'Work Management', alt: 'Work Management' },
                { icon: '/images/agents/optimizing 1.png', title: 'Developer Support', alt: 'Developer Support' }
            ]
        },
        'Industry Solutions': {
            centerTitle: 'Industry Solutions',
            centerSubtitle: 'Specialized Solutions for Every Sector',
            items: [
                { icon: '/images/agents/factory 1.png', title: 'Manufacturing', alt: 'Manufacturing' },
                { icon: '/images/agents/sprout 1.png', title: 'Agriculture', alt: ' Agriculture' },
                { icon: '/images/agents/medical-check 1.png', title: 'Healthcare', alt: 'Healthcare' },
                { icon: '/images/agents/law 1.png', title: 'Legal', alt: 'Legal' },
                { icon: '/images/agents/background 1.png', title: 'Media & Entertainment', alt: 'Media & Entertainment' },
                { icon: '/images/agents/shop-bag 1.png', title: 'Retail', alt: 'Retail' },
                { icon: '/images/agents/building 1.png', title: 'Real Estate', alt: 'Real Estate' },
                { icon: '/images/agents/hr-manager (1) 1.png', title: 'Human Resources', alt: 'Human Resources' },
                { icon: '/images/agents/budget 1.png', title: 'Fintech', alt: 'Fintech' },
                { icon: '/images/agents/bank 1.png', title: 'Banking', alt: 'Banking' }
            ]
        },
        'Customer Solutions': {
            centerTitle: 'Customer Solutions',
            centerSubtitle: 'Personal AI Assistants for Everyone',
            items: [
                { icon: '/images/img_background_blue_800.svg', title: 'Personal\nAssistant', alt: 'Personal Assistant' },
                { icon: '/images/img_frame_blue_800.svg', title: 'Smart Home\nControl', alt: 'Smart Home' },
                { icon: '/images/Frame_2.svg', title: 'Learning\nCompanion', alt: 'Learning' },
                { icon: '/images/img_frame.svg', title: 'Health\nTracker', alt: 'Health Tracker' },
                { icon: '/images/Frame_3.svg', title: 'Entertainment\nCurator', alt: 'Entertainment' },
                { icon: '/images/Frame_4.svg', title: 'Shopping\nAdvisor', alt: 'Shopping' },
                { icon: '/images/Frame.svg', title: 'Travel\nPlanner', alt: 'Travel Planner' },
                { icon: '/images/img_frame_60x60.svg', title: 'Finance\nManager', alt: 'Finance Manager' }
            ]
        }
    };

    const getNonRepeatingItems = () => {
        const currentContent = getCurrentAgentContent();
        return currentContent.items;
    };

    const getCurrentAgentContent = () => {
        return agentContent[activeButton] || agentContent['Foundation Agents'];
    };

    return (
        <div>
            <div className="relative mt-20 w-full overflow-hidden py-16 px-4 h-[800px]" style={{ backgroundImage: "url('/images/Full-bg.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="text-center mb-12 relative">
                    <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        Agentic work bench
                    </h2>
                    <p className="text-white/80 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
                        Explore a world of 1500+ AI agents, each crafted to solve real problems. Discover, customize, and let AI work for you faster than ever before.
                    </p>
                </div>
                <div className='flex justify-center relative gap-4'>
                    <div>
                        <button
                            className={`font-semibold py-2 px-4 rounded-full shadow hover:shadow-lg transition ${activeButton === 'Foundation Agents'
                                ? 'bg-[#064EE3] text-white border-2 border-blue-900'
                                : 'bg-white text-blue-900 border-2 border-transparent hover:border-blue-300'
                                }`}
                            onClick={() => setActiveButton('Foundation Agents')}
                        >
                            Foundation Agents
                        </button>
                    </div>
                    <div>
                        <button
                            className={`font-semibold py-2 px-4 rounded-full shadow hover:shadow-lg transition ${activeButton === 'Industry Solutions'
                                ? 'bg-[#064EE3] text-white border-2 border-blue-900'
                                : 'bg-white text-blue-900 border-2 border-transparent hover:border-blue-300'
                                }`}
                            onClick={() => setActiveButton('Industry Solutions')}
                        >
                            Industry Solutions
                        </button>
                    </div>
                    <div>
                        <button
                            className={`font-semibold py-2 px-4 rounded-full shadow hover:shadow-lg transition ${activeButton === 'Customer Solutions'
                                ? 'bg-[#064EE3] text-white border-2 border-blue-900'
                                : 'bg-white text-blue-900 border-2 border-transparent hover:border-blue-300'
                                }`}
                            onClick={() => setActiveButton('Customer Solutions')}
                        >
                            Customer Solutions
                        </button>
                    </div>
                </div>
                <div className="relative flex items-center justify-center w-full -bottom-30 z-10  h-[700px]">
                    <div className='absolute inset-0 flex items-center justify-center'>
                        <OrbitingCircles
                            className="rounded-full"
                            radius={350}
                            duration={25}
                            iconSize={120}
                            path={true}
                            showExternalText={true}
                        >
                            {getNonRepeatingItems().map((item, index) => (
                                <div key={`${activeButton}-${index}`} className="flex flex-col items-center" onClick={() => setisSignUpOpen(true)}>
                                    <div className="bg-white rounded-full p-3 shadow-xl mb-2 border-6 border-[#dee0df]">
                                        <img
                                            src={item.icon}
                                            alt={item.alt}
                                            className="w-10 h-10"
                                        />
                                    </div>
                                    <span className="text-[18px] font-medium text-white text-center whitespace-nowrap">
                                        {item.title.split('\n').map((line, lineIndex) => (
                                            <span key={lineIndex}>
                                                {line}
                                                {lineIndex < item.title.split('\n').length - 1 && <br />}
                                            </span>
                                        ))}
                                    </span>
                                </div>
                            ))}
                        </OrbitingCircles>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center -bottom-24">
                        <div className="relative text-center flex items-center justify-center">
                            <div className="absolute rounded-full border-30 border-[#02153D] w-100 h-100 flex items-center justify-center" />
                            <div className="relative z-10">
                                <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-bold mb-24">
                                    {getCurrentAgentContent().centerTitle}
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SignUpModal
                isOpen={isSignUpOpen}
                onClose={() => setisSignUpOpen(false)}
            />
        </div>
    )
}

export default OrbitHero
