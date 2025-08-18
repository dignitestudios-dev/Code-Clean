function formatDate(dateString) {
  if (!dateString) return '';
  
  const dateObj = new Date(dateString);
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = dateObj.toLocaleString('en-GB', { month: 'short' });
  const year = dateObj.getFullYear();
  
  return `${day}/${month}/${year}`;
}

export {formatDate};