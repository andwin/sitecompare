let clean = function(content, patterns) {
  for (let pattern of patterns) {
    let regex = new RegExp(pattern, 'g');
    content = content.replace(regex, '');
  }

  return content;
};

module.exports = clean;
