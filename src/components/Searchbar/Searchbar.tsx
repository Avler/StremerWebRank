import React from 'react';
import { Link } from 'react-router-dom';
import { Stremer } from '../../App';
import './style.scss';

interface SearchbarProps {
  search: string;
  setsearch: React.Dispatch<React.SetStateAction<string>>;
  dataStremers: Stremer[];
}

const Searchbar: React.FC<SearchbarProps> = ({
  search,
  setsearch,
  dataStremers,
}) => {
  const data = [];

  const clearSearch = () => {
    setsearch('');
  };
  return (
    <>
      <ul className={'searchList'}>
        {dataStremers
          .filter((elm: Stremer) => {
            if (search === '') {
              return elm;
            } else if (elm.name.toLowerCase().includes(search.toLowerCase())) {
              return elm;
            }
          })
          .map((elm: Stremer) =>
            search === '' ? null : (
              <Link
                to={`/${elm.routes}`}
                key={elm.routes}
                onClick={clearSearch}
                className={'list-item'}
              >
                <img src={elm.img} />
                <span>{elm.name}</span>
                <span>{elm.platform} Stremer</span>
              </Link>
            )
          )}
      </ul>
    </>
  );
};

export default Searchbar;
