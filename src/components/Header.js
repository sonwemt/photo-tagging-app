import '../styles/header.css';

function Header( {headerText, time} ) {
  return <div id="headerContainer">
    <h1 id="header">{headerText}</h1>
    <h3 id="timer">Time elapsed: {time}</h3>
  </div>
}

export{ Header };