import { Link } from 'react-router-dom';

// importing sass
import '../scss/main.scss';

// importing components
import ProductPrompt from '../components/Prompt1';

function promptTest1() {
  return (
    <>
     <div id="sidebar">

      <div className="sidebar-left">
        <div className="sidebar-title">Greenvoyage</div>
      </div>

      <div className="sidebar-right">
        <nav>
          <ul className='nav-links'>
            <li className='sidebar-list'>
              <Link to={`../`}>home</Link>
            </li>
            <li className='sidebar-list'>
              <Link to={`../promptTool1`}>testing</Link>
            </li>
            <li className='sidebar-list'>
              <Link to={`../promptTool2`}>prompt tool</Link>
            </li>
          </ul>
        </nav>
      </div>

    </div>
   
      <div>
        <ProductPrompt/>
      </div>
    </>
  );
}

export default promptTest1
