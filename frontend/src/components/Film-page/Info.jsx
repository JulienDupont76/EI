import './Info.css';

const Info = () => {
  return (
    <div className="container-info">
      <div>
        <p style={{ fontSize: '20px', fontWeight: '700', margin: '10px 0' }}>
          Titre d'origine
        </p>
        <p style={{ fontSize: '18px', margin: '10px 0' }}>
          John Wick: Chapter 4
        </p>
      </div>
      <div>
        <p style={{ fontSize: '20px', fontWeight: '700', margin: '10px 0' }}>
          Statut
        </p>
        <p style={{ fontSize: '18px', margin: '10px 0' }}>Film sorti</p>
      </div>
      <div>
        <p style={{ fontSize: '20px', fontWeight: '700', margin: '10px 0' }}>
          Langue d'origine
        </p>
        <p style={{ fontSize: '18px', margin: '10px 0' }}>Anglais</p>
      </div>
      <div>
        <p style={{ fontSize: '20px', fontWeight: '700', margin: '10px 0' }}>
          Budget
        </p>
        <p style={{ fontSize: '18px', margin: '10px 0' }}>$90,000,000.00</p>
      </div>
      <div>
        <p style={{ fontSize: '20px', fontWeight: '700', margin: '10px 0' }}>
          Recette
        </p>
        <p style={{ fontSize: '18px', margin: '10px 0' }}>$426,769,198.00</p>
      </div>
    </div>
  );
};

export default Info;
