import { Routes, Route } from "react-router-dom";
import UseCase from "../pages/UseCase/UseCase";
import UseCaseDetail from "../pages/UseCase/useCaseDetail/UseCaseDetail";
import LifeAtSNSSquare from "../pages/lifeAtSnsSquare/LifeAtSNSSquare";
import HomePage from '../pages/Home';
import AgentsDetails from "../pages/agentWorkbench/AgentsDetails";
import CategoriesAgents from "../pages/agentWorkbench/CategoriesAgents";
import Categories from "../pages/agentWorkbench/Categories";
import AgentWorkbenchIndex from "../pages/agentWorkbench/Index";
import AgentWorkbenchLayout from "../pages/agentWorkbench/AgentWorkbenchLayout";
import Sidebar from "../components/common/Sidebar";
import OrbitCircle from "../pages/agentWorkbench/orbitCircle";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={< HomePage />} />
      <Route path="/usecase" element={<UseCase />} />
      <Route path="/usecase/:id" element={<UseCaseDetail />} />
      <Route path="/life-at-sns" element={<LifeAtSNSSquare />} />
      <Route path="/agent-workbench" element={<OrbitCircle />}>
        {/* Landing Page */}
        <Route index element={<AgentWorkbenchIndex />} />

        {/* Industry-specific agents - direct access without sidebar */}
        <Route path="industry-specific-agents/:categoryId/agents" element={<CategoriesAgents />} />
        {/* <Route path="industry-specific-agents/:categoryId/agents/:agentId" element={<AgentsDetails />} /> */}

        {/* Category selection pages */}
        <Route path=":category" >
          <Route index element={<AgentWorkbenchIndex />} />

          {/* Foundational agents - with sidebar for subcategories */}
          <Route path=":categoryId" element={<Sidebar />}>
            {/* Categories List */}
            <Route index element={<Categories />} />
            <Route path="agents" element={<CategoriesAgents />} />
            {/* Category Details */}
            <Route path=":subcategoryId/agents" element={<CategoriesAgents />} />
            {/* <Route path=":subcategoryId/agents/:agentId" element={<AgentsDetails />} /> */}
          </Route>

        </Route>

        {/* Agent Details */}
        {/* <Route path=":category/:categoryId/:subcategoryId/:agentId" element={<AgentsDetails />} /> */}
        {/* <Route path=":category/:categoryId/:agentId" element={<AgentsDetails />} /> */}
      </Route>
      <Route path="/agent-workbench/:category/:categoryId/:subcategoryId/agents/:agentId" element={<AgentsDetails />} />
      <Route path="/agent-workbench/:category/:categoryId/agents/:agentId" element={<AgentsDetails />} />
    </Routes>
  );
}
