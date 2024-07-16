import AppDownload from "../../appDownload/AppDownload";
import ExploreMenu from "../../exploreMenu/ExploreMenu";
import FoodDisplay from "../../foodDisplay/FoodDisplay";
import Footer from "../../footer/Footer";
import Hero from "../../hero/Hero";
import NavBar from "../../navBar/NavBar";
import "./Home.css";
import { useState } from "react";

const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <>
      <div className="app">
        <NavBar />
        <Hero />
        <ExploreMenu category={category} setCategory={setCategory} />
        <div className="diveder" />
        <FoodDisplay category={category} />
        <AppDownload />
      </div>
      <Footer />
    </>
  );
};

export default Home;
