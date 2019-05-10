/**
 * 2019-05-02T22:30:38.637Z => 2019-05-02 07:30:38
 * @param {String} value
 * @returns {String}
 */
export const toLocaleString = (value) => {
  try {
    if (value) {
      const d = new Date(value);
      const yyyy = d.getFullYear();
      const mm = ('00' + (d.getMonth() + 1)).slice(-2);
      const dd = ('00' + d.getDate()).slice(-2);
      const hh = ('00' + d.getHours()).slice(-2);
      const mi = ('00' + d.getMinutes()).slice(-2);
      const ss = ('00' + d.getSeconds()).slice(-2);
      return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
    }
  } catch (err) {
    console.error(err);
  }
  return '';
};
