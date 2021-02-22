import React from 'react';
import TextField from '@material-ui/core/TextField';

const PhoneInput = (props) => {
  const onChangeInput = (e) => {
    let text = e.target.value;
    if (text.length < 1 || text[text.length - 1] === '-') {
      return;// dont append
    }
    const hyphenPos = [3, 9];

    for (let c = 0; c < hyphenPos.length; c += 1) {
      const pos = hyphenPos[c];
      if (pos > text.length) {
        break;
      }

      if (text[pos] !== '-') {
        text = `${text.substring(0, pos)}-${text.substring(pos)}`;
      }
    }
    // console.log("oninput", e.target.value, text);
    e.target.value = text;
  };

  return (
    <TextField {...props} onChange={onChangeInput} />
  );
};

export default PhoneInput;
