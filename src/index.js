import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//'./App'은 .js가 생략된 것으로 App.js파일이라고 보면 됩니다.
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
  //id가 "root"인 태그를 선택하는 자바스크립트의 선택자 문법
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
