import React from 'react';

export default function CompleteButton(props) {
  return (
    <button onClick={props.onClick} className="todoButton">
      <svg className="todoIcon" viewBox="0 0 20 20" width='20' height='20'>
        <path fill="black" d="M7.197,16.963H7.195c-0.204,0-0.399-0.083-0.544-0.227l-6.039-6.082c-0.3-0.302-0.297-0.788,0.003-1.087
        C0.919,9.266,1.404,9.269,1.702,9.57l5.495,5.536L18.221,4.083c0.301-0.301,0.787-0.301,1.087,0c0.301,0.3,0.301,0.787,0,1.087
        L7.741,16.738C7.596,16.882,7.401,16.963,7.197,16.963z"></path>
      </svg>
      </button>
  )
}