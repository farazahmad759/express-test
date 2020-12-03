function getFormattedTopicNumber(value) {
  // let strings = [
  // "1 - Measurements",
  // "1.1 - Introduction to Physics",
  // "01.1 - Introduction to Physics",
  // "01.02 - Physical Quantities",
  // "01.02.10 - Physical Quantities",
  // "1. wrong",
  // "1.10 -right"
  // ];

  let re1 = /^([a-z0-9]{1,}.)*\s*-\s*/g;
  let found = re1.test(value);
  let _formattedTopicNumber = null;
  let count = null;
  if (found) {
    let _topicNumber = value.match(re1)[0];
    let _extractedDigits = _topicNumber.match(/[a-z0-9]{1,}/g);
    if (_extractedDigits) {
      _formattedTopicNumber = '';
      // console.log('==================================', _extractedDigits);
      _extractedDigits.forEach((item) => {
        _formattedTopicNumber += item.padStart(4, '0') + '.';
      });
      let re2 = /[a-z0-9]*./g;
      count = (_formattedTopicNumber.match(re2) || []).length;
      let countString = count.toString().padStart(2, '0');
      // console.log('count', countString);

      // _formattedTopicNumber = countString + ' - ' + _formattedTopicNumber;
      // console.log('count', _formattedTopicNumber);
    }
  }
  let ret = {
    topicLevel: count,
    topicFormat: _formattedTopicNumber,
  };
  // console.log(
  //   '==========================================================',
  //   ret
  // );
  return ret;
}
