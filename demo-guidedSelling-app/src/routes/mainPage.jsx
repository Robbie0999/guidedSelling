import { Link } from 'react-router-dom';
import '../scss/main.scss';

function MainPage() {
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
                <Link to="/">home</Link>
              </li>
              <li className='sidebar-list'>
                <Link to="/promptTest2">Prompt Test 2</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default MainPage;
