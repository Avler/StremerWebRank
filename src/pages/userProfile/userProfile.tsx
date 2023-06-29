import { Stremer } from '../../App';
import { useLocation } from 'react-router-dom';
import './style.scss';

interface homeProps {
  dataStremers: Stremer[];
  loginPanelShadow: boolean;
}

const UserProfile = ({ dataStremers, loginPanelShadow }: homeProps) => {
  const location = useLocation();
  const elmRoute = location.pathname.substring(1);

  const singleData: Stremer[] = dataStremers.filter(
    (elm) => elm.routes === elmRoute
  );

  const stremerInfo = singleData.map((elm) => {
    return (
      <div key={elm.id} className="stremer-section-cont-elm">
        <div>
          <img src={elm.img} alt="stremer image" className="stremer-img" />
        </div>
        <div className="stremer-section-cont-elm-des">
          <p className={elm.platform}>{elm.platform} Stremer</p>
          <p className="des">{elm.description}</p>
        </div>
      </div>
    );
  });
  return (
    <section className="stremer-section-cont">
      <div className="cont">{stremerInfo}</div>
      {loginPanelShadow ? <div className="home-cont-shadow"></div> : <></>}
    </section>
  );
};
export default UserProfile;
