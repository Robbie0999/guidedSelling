import { Link } from 'react-router-dom';

import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn, faYoutube } from '@fortawesome/free-brands-svg-icons';

import heroBG from '../assets/img/productImage6.jpg';
import suitcasePreview from '../assets/img/productImage9.jpg';
import travelbagPreview from '../assets/img/productImage18.jpg';
import accessoiresPreview from '../assets/img/productImage25.jpg';

import catalogusIcon1 from '../assets/icons/delivery-truck.png';
import catalogusIcon2 from '../assets/icons/headphones.png';
import catalogusIcon3 from '../assets/icons/eco-friendly.png';
import catalogusIcon4 from '../assets/icons/chat-bot.png';

// importing sass
import '../scss/main.scss';

// importing components
import ProductPrompt2 from '../components/Prompt2';

function promptTest2() {
  return (
    <>
      <nav id="navbar">

        <div className="navbar-banner">
          <div className="banner-text">Free shipping available on all order</div>
          <div className="banner-text">Free shipping available on all order</div>
          <div className="banner-text">Free shipping available on all order</div>
          <div className="banner-text">Free shipping available on all order</div>
          <div className="banner-text">Free shipping available on all order</div>
        </div>

        <div className="navbar-content">
          <div className="navbar-left">
            <div className="navbar-title">Greenvoyage</div>
          </div>

          <div className="navbar-right">
            <nav>
              <ul className='nav-links'>
                <li className='navbar-list'>
                  <Link to={`../`}>home</Link>
                </li>
                <li className='navbar-list'>
                  <Link to={`../promptTool1`}>testing</Link>
                </li>
                <li className='navbar-list'>
                  <Link to={`../promptTool2`}>prompt tool</Link>
                </li>
                <li className='navbar-list'>
                <Link to={`../promptToolAI`}>openAI</Link>
              </li>
              </ul>
            </nav>
          </div>
        </div>
        
      </nav>

      <section className="hero-container">
        <div className="hero-overlay">
          <img src={heroBG} alt="" className="hero-bg" />
          <div className="overlay"></div>
        </div>

        <div className="hero-container-content">
          <div className="hero-left">
            <div className="hero-nav-link">
              home  <span>catalog</span>
            </div>
            <div className="hero-nav-title">Catalog</div>
          </div>

          <div className="hero-right">
            <div className="hero-sale-btn">sale 20% off!</div>
            <div className="hero-title">Voyage Elite</div>
            <div className="hero-subtitle">
            Be the most fashionable voyager at your destination with our new, no-scratch lightweight suitcases. <i>Pack light, travel light, and make every adventure count.</i>
            </div>
            <div className="hero-view-btn">shop now!</div>
          </div>
        </div>
      </section>

      <section className="catalogus-preview-container">
        <div className="preview-card">
          <div className="preview-overlay">
            <img src={suitcasePreview} alt="" className="catalogus-preview-img" />
            <div className="overlay"></div>
          </div>
          <div className="preview-content">
            <div className="preview-title">Suitcases</div>
            <div className="preview-amount">10 products</div>
          </div>
        </div>

        <div className="preview-card">
          <div className="preview-overlay">
            <img src={travelbagPreview} alt="" className="catalogus-preview-img" />
            <div className="overlay"></div>
          </div>
          <div className="preview-content">
            <div className="preview-title">travel bags</div>
            <div className="preview-amount">10 products</div>
          </div>
        </div>

        <div className="preview-card">
          <div className="preview-overlay">
            <img src={accessoiresPreview} alt="" className="catalogus-preview-img" />
            <div className="overlay"></div>
          </div>
          <div className="preview-content">
            <div className="preview-title">accessoires</div>
            <div className="preview-amount">10 products</div>
          </div>
        </div>
      </section>

      <section className="catalogus-info-container">
        <div className="catalogus-info-wrapper">
          <div className="catalogus-info1">
            <div className="info-icon-container">
              <img src={catalogusIcon1} alt="" className="info-icon" />
            </div>
            <div className="info-text">
              Free delivery
            </div>
          </div>

          <div className="catalogus-info2">
            <div className="info-icon-container">
              <img src={catalogusIcon2} alt="" className="info-icon" />
            </div>
            <div className="info-text">
              24/7 support
            </div>
          </div>

          <div className="catalogus-info3">
            <div className="info-icon-container">
              <img src={catalogusIcon3} alt="" className="info-icon" />
            </div>
            <div className="info-text">
              eco-friendly design
            </div>
          </div>

          <div className="catalogus-info4">
            <div className="info-icon-container">
              <img src={catalogusIcon4} alt="" className="info-icon" />
            </div>
            <div className="info-text">
              new AI Tool!
            </div>
          </div>
        </div>
      </section>
   
      <div>
        <ProductPrompt2/>
      </div>

      <footer>
        <div className="content">
          <div className="top">
            <div className="logo-details">
              <span className="logo-name">Greenvoyage</span>
            </div>
            <div className="media-icons">
              <a href="#"><FontAwesomeIcon icon={faFacebookF}/></a> 
              <a href="#"><FontAwesomeIcon icon={faTwitter}/></a>
              <a href="#"><FontAwesomeIcon icon={faInstagram}/></a>
              <a href="#"><FontAwesomeIcon icon={faLinkedinIn}/></a>
              <a href="#"><FontAwesomeIcon icon={faYoutube}/></a>
            </div>
          </div>
          <div className="link-boxes">
            <ul className="box">
              <li className="link_name">Company</li>
              <li><a href="#">home</a></li>
              <li><a href="#">testing</a></li>
              <li><a href="#">prompt tool</a></li>
              <li><a href="#">openai</a></li>
            </ul>
            <ul className="box">
              <li className="link_name">Catalog</li>
              <li><a href="#">suitcases</a></li>
              <li><a href="#">travel bags</a></li>
              <li><a href="#">accessoires</a></li>
            </ul>
          </div>
        </div>
        <div className="bottom-details">
          <div className="bottom_text">
            <span className="copyright_text">Copyright © 2024 <a href="#">Greenvoyage.</a>All rights reserved</span>
            <span className="policy_terms">
              <a href="#">Privacy policy</a>
              <a href="#">Terms & condition</a>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default promptTest2
