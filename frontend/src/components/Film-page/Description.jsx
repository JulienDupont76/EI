import { BsHeartFill } from 'react-icons/bs';
import './Description.css';

const Description = () => {
  return (
    <div className="test">
      <div className="test2">
        <img
          className="poster"
          src="https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg"
          alt="test"
        />
        <div className="cartouche">
          <section>
            <h1 className="title">John Wick</h1>
            <div className="infos">
              <span className="certification">12</span>
              <p style={{ fontSize: '20px' }}>22/03/2023 (FR)</p>
              <p style={{ fontSize: '20px' }}>Action, Thriller ,Crime</p>
              <p style={{ fontSize: '20px' }}>2h 49m</p>
            </div>
            <div className="overview">
              <p
                style={{
                  fontSize: '25px',
                  fontWeight: '400',
                  fontStyle: 'italic',
                  opacity: '0.7',
                  margin: '10px 0',
                }}
              >
                Pas de retour, une seule sortie.
              </p>
              <h2 style={{ fontSize: '30px', margin: '10px 0' }}>Synopsis</h2>
              <p
                style={{
                  fontSize: '22px',
                  fontWeight: '500',
                  lineHeight: '1.5',
                }}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
                laborum. Doloribus, sequi autem. Quasi, aperiam? Sint quas at
                deserunt, totam distinctio repellendus earum dignissimos eos, et
                necessitatibus illo explicabo non!
              </p>
            </div>
            <div className="boutons">
              <div className="note">
                <p style={{ fontSize: '20px' }}>Note des utilisateurs</p>
                <span>80%</span>
              </div>
              <div className="like">
                <BsHeartFill />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Description;
