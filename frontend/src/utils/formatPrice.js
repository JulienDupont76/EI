const formatPrix = (number) => {
  const str = String(number);
  const parts = str.split('.');
  const integer = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const result = parts.length > 1 ? integer + '.' + parts[1] : integer;

  return result;
};

export default formatPrix;
