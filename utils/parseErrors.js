module.exports = function(errors) {
  const result = {};
  Object.keys(errors).forEach(function(key) {
  	result[key] = errors[key].message;
  });
  return result;
};