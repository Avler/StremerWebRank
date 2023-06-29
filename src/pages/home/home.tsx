import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessKing } from '@fortawesome/free-regular-svg-icons';
import {
  faThumbsUp,
  faThumbsDown,
  faTrophy,
} from '@fortawesome/free-solid-svg-icons';
import { Stremer } from '../../App';
import { Link } from 'react-router-dom';
import supabase from '../../supabase';
import './style.scss';

interface homeProps {
  loginPanelShadow: boolean;
  dataStremers: Stremer[];
  fetchData: () => Promise<void>;
}

const home: React.FC<homeProps> = ({
  loginPanelShadow,
  dataStremers,
  fetchData,
}) => {
  const dataSorted = [...dataStremers].sort((a, b) => b.vote - a.vote);

  const section = dataSorted.map((elm, index) => {
    const sequentialNumber = index + 1;
    const valueIncreased = elm.vote + 1;
    const valueDecreased = elm.vote - 1;

    const postiveScore = async (id: string) => {
      const vote = dataStremers.find((elm: Stremer) => elm.id === id)?.vote;
      await supabase
        .from('stremers')
        .update({ vote: valueIncreased })
        .eq('id', id);
      fetchData();
    };
    const negativeScore = async (id: string) => {
      const vote = dataStremers.find((elm: Stremer) => elm.id === id)?.vote;
      await supabase
        .from('stremers')
        .update({ vote: valueDecreased })
        .eq('id', id);
      fetchData();
    };

    let color;
    if (sequentialNumber === 1) {
      color = '#ebd700';
    } else if (sequentialNumber === 2) {
      color = '#bfbfbf';
    } else if (sequentialNumber === 3) {
      color = '#5d3c04';
    } else {
      color = '#1a1a1a';
    }

    return (
      <div className="section-list-cont" key={elm.id}>
        <div className="section-list">
          <FontAwesomeIcon icon={faTrophy} style={{ color: color }} />
          <p className="section-list-info">{`${sequentialNumber} #`}</p>
          <Link to={elm.routes}>
            <p className="section-list-info-name">{elm.name}</p>{' '}
          </Link>
          <p className="section-list-info">
            Score{' '}
            <span
              className={elm.vote > 0 ? 'positive-score' : 'negative-score'}
            >
              {elm.vote}
            </span>
          </p>
          <FontAwesomeIcon
            icon={faThumbsUp}
            size="lg"
            style={{ color: '#1d6325' }}
            className="icon"
            onClick={() => postiveScore(elm.id)}
          />
          <FontAwesomeIcon
            icon={faThumbsDown}
            size="lg"
            style={{ color: '#5d0404' }}
            className="icon"
            onClick={() => negativeScore(elm.id)}
          />
        </div>
      </div>
    );
  });
  return (
    <section className="home-cont">
      <div className="home-header-cont">
        <h1 className="home-title">Top Stremers by Users Vote</h1>
        <FontAwesomeIcon
          icon={faChessKing}
          bounce
          size="2xl"
          style={{ color: '#ffda8a' }}
        />
      </div>
      <div className="section-cont">
        <div className="section-cont-titles">
          <p>Nr.Rank</p>
          <p>Name</p>
          <p>Score</p>
        </div>
        {section}
      </div>
      {loginPanelShadow ? <div className="home-cont-shadow"></div> : <></>}
    </section>
  );
};
export default home;
