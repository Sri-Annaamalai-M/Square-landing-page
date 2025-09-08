// src/components/Footer.jsx
import { Linkedin, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Footer() {
  // const Link = NavLink();
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <footer className="bg-[#0A1B3E] text-white">
      {/* Top CTA Section */}
     

      {/* Footer Links */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-20 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo */}
        <div>
          <img
            src="/images/square_logo.png" // Replace with your actual logo path
            alt="SNS Square"
            className="w-46 mb-6"
          />
        </div>

        {/* Solutions */}
        <div>
          <h3 className="font-semibold text-blue-400 mb-4">Agent workbench</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>Foundational models</li>
            <li>Industry specific models</li>
          </ul> 
        </div>

        {/* Use Cases */}
        <div>
          <h3 className="font-semibold text-blue-400 mb-4">Use Cases</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              <Link 
                to="/usecase?category=supply-chain" 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Supply Chain
              </Link>
            </li>
            <li>
              <Link 
                to="/usecase?category=information-technology" 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                IT Solution
              </Link>
            </li>
            <li>
              <Link 
                to="/usecase?category=healthcare" 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Healthcare
              </Link>
            </li>
            <li>
              <Link 
                to="/usecase?category=insurance" 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Insurance
              </Link>
            </li>
            <li>
              <Link 
                to="/usecase?category=human-resource" 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Human Resource
              </Link>
            </li>
          </ul>

          <h3 className="font-semibold text-blue-400 mt-6 mb-4">Company</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              <Link 
                to="/agent-workbench" 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Agent Workbench
              </Link>
            </li>
            <li>
              <Link 
                to="/usecase" 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Use cases
              </Link>
            </li>
            <li>
              <Link 
                to="/life-at-sns" 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Life at SNS Square
              </Link>
            </li>
            <li 
              onClick={() => {
                const ctaSection = document.getElementById('cta-section');
                if (ctaSection) {
                  ctaSection.scrollIntoView({ behavior: 'smooth' });
                }
                setMenuOpen(false);
              }}
              className="cursor-pointer hover:text-blue-400 transition-colors"
            >
              Contact us
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-blue-400 mb-4">Address</h3>
          <p className="text-gray-300 text-sm mb-4">
            BLOCK-L, Embassy Tech Village, Outer Ring Rd, Devarabisanahalli,
            Bellandur, Bengaluru, Karnataka 560103
          </p>

          <h3 className="font-semibold mb-2 text-blue-400">Email</h3>
          <p className="text-gray-300 text-sm mb-6">info@snssquare.com</p>


        </div>
      </div>

      {/* Bottom copyright */}
      <div className="max-w-7xl mx-auto border-t border-gray-700 px-6 pb-10 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center text-gray-400 text-sm  py-4">
        © 2025 SNS Square. All rights reserved.
        </div>
        <div>
        {/* Social Icons */}
          <div className="flex space-x-4">
            <a href="https://www.linkedin.com/company/snssquare/" target="_blank" className="hover:text-blue-400">
              <Linkedin size={20} />
            </a>
            <a href="https://www.youtube.com/@snssquare" target="_blank" className="hover:text-red-500">
              <Youtube size={20} />
            </a>
          </div>
       </div>
          
      </div>
      
    </footer>
  );
}
