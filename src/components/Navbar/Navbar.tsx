import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import Searchbar from '../Searchbar/Searchbar';
import { Stremer } from '../../App';
import './style.scss';

interface HeaderProps {
  showPanel: (state: ((prevState: boolean) => boolean) | boolean) => void;
  dataStremers: Stremer[];
}
const Navbar: React.FC<HeaderProps> = ({ showPanel, dataStremers }) => {
  const [searchValue, setSearchValue] = useState<string>('');

  const userPanel = () => {
    showPanel((state) => !state);
    scrollToTop();
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <section className="header-section">
      <div className="header-section-head">
        <div className="nav-bar-md">
          <ul className="nav-list">
            <Link to="/">
              <li className="nav-items" onClick={scrollToTop}>
                <span className="text-items">Top Stremers</span>{' '}
                <FontAwesomeIcon icon={faStar} size="xl" />
              </li>
            </Link>
            <form className="header-section-list">
              <div className="header-section-search">
                <FontAwesomeIcon
                  icon={faSearch}
                  size="sm"
                  className="icon"
                  style={{ color: 'black' }}
                />
                <input
                  type="text"
                  className="search-input"
                  onChange={(e) => setSearchValue(e.target.value)}
                  value={searchValue}
                  placeholder="Search Stremer"
                />
              </div>
              <Searchbar
                search={searchValue}
                setsearch={setSearchValue}
                dataStremers={dataStremers}
              />
            </form>
            <li className="nav-items" onClick={userPanel}>
              <FontAwesomeIcon icon={faUserPlus} size="xl" />
              <span className="text-items">Add Stremer</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
