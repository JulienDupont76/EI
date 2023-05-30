const convertDateUStoFR = (dateUS) => {
  const parts = dateUS.split('-');
  const day = parts[2];
  const month = parts[1];
  const year = parts[0];
  const dateFR = `${day}/${month}/${year}`;

  return dateFR;
};

export default convertDateUStoFR;
