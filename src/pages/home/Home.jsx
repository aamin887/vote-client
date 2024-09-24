import "./home.css";
import {
  Header,
  Footer,
  HowItWorks,
  Features,
  FAQ,
  Contact,
} from "../../components";

function Home() {
  return (
    <div className="landing__page landing__padding ">
      <Header />
      <Features />
      <HowItWorks />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}

export default Home;
