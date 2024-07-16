import "./Hero.css"
const Hero = () => {
  return (
    <div className="hero">
        <div className="hero-content">
            <h2>Order your favourite Food here</h2>
            <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time</p>
           <a href="#explore-menu">
             <button>View Menu</button>
           </a>
        </div>
    </div>
  )
}

export default Hero