"use client"

import React, { useState } from 'react';

const Capture = () => {
  const [captureStatus, setCaptureStatus] = useState('');

  const handleCapture = () => {
    const url = 'http://127.0.0.1:11100/capture';

    const PIDOPTS =
      '<PidOptions ver="1.0">' +
      '<Opts env="P" fCount="1" fType="2" iCount="" iType="" pCount="" pType="" format="0" pidVer="2.0" timeout="10000" otp="" wadh="" posh=""/>' +
      '</PidOptions>';

    const xhr = new XMLHttpRequest();

    xhr.open('CAPTURE', url, true);
    xhr.setRequestHeader('Content-Type', 'text/xml');
    xhr.setRequestHeader('Accept', 'text/xml');

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        const status = xhr.status;
        if (status === 200) {
          const responseText = xhr.responseText;
          const errCodeIndex = responseText.search('errCode');
          const secondQuoteIndex = getPosition(responseText, '"', 2);
          const errCodeStartIndex = errCodeIndex + 9;
          const errCodeEndIndex = secondQuoteIndex;
          const errCode = responseText.slice(errCodeStartIndex, errCodeEndIndex);

          if (errCode > 0) {
            setCaptureStatus('XXX Capture Unsuccessful XXX');
            alert(xhr.responseText);
          } else {
            setCaptureStatus('Captured Successfully');
            alert('Captured Successfully');
          }
        } else {
          console.log(xhr.response);
        }
      }
    };

    xhr.send(PIDOPTS);
  };

  // A function to get the position of a character in a string
  const getPosition = (string, subString, index) => {
    return string.split(subString, index).join(subString).length;
  };

  return (
    <div>
      <button onClick={handleCapture} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Capture</button>
      <p>{captureStatus}</p>
    </div>
  );
};

export default Capture;
