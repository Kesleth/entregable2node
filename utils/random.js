function random() {
  let number = '';
  for (let i = 0; i < 6; i++) {
    number += Math.floor(Math.random() * 10);
  }
  return number;
}

module.exports = random;
