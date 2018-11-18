exports.alphanumOnly = data => /^[a-z\d\-_\s]+$/i.test(data);

exports.aWeekOrLess = data => data <= 7 && data > 0;

module.exports = exports;