import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import AppRoutes from "./routes/AppRoutes";
import CTA from "./components/common/CTA";
function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="">
        <AppRoutes />
      </main>
    <div id="cta-section">
      <CTA />
    </div>
      {/* <CTA/> */}
      <Footer />
    </div>
  );
}

export default App;
