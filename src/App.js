import logo from './logo.svg';
import './App.css';

function App() {
  const email=localStorage.getItem('useremail');



axios({
    url:'http://localhost:2077/forgot',
    method:'POST',
    headers:{'Content-type':'application/json'},
    data:
    {
       email:email
    }
})

this.props.history.push('/forgot')


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

    </div>
  );
}

export default App;
