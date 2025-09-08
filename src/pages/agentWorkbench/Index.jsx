import React from "react";
import agentsData from "../../../public/data/agentsData";
import { useParams,useNavigate } from "react-router-dom";
import CategoryGrid from "../../components/agentWorkbench/CategoryGrid";

export default function CategoryGridoverall() {
const navigate = useNavigate();
 
 let { category } = useParams();
  let selectedCategory;
if (category === "industry-specific-agents") {
  selectedCategory = { industry: agentsData.industry };
} else if (category === "foundation-agents") {
  selectedCategory = { foundational: agentsData.foundational };
} else {
  selectedCategory = { foundational: agentsData.foundational };
}

    const handleLearnMore = (categoryId) => {
         if(!category){
            category="foundation-agents"
        }
        if(category==="industry-specific-agents") {
            navigate(`/agent-workbench/${category}/${categoryId}/agents`);
            return;
        }
        navigate(`/agent-workbench/${category}/${categoryId}`);
        console.log(`Learning more about category: ${categoryId}`);
    };
  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <CategoryGrid 
          data={selectedCategory} 
          onLearnMore={handleLearnMore}
          showCounts={true}
          showExploreMore={true}
          initialShowCount={6}
        />
      </div>
    </div>
  );
}