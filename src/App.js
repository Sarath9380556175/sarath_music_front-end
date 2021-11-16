import logo from './logo.svg';
import './App.css';

function App() {
  const email=localStorage.getItem('useremail');





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

const otp = Math.floor(1000 + Math.random() * 9000);

//sms77io api

var options = {
  method: 'POST',
  url: 'https://sms77io.p.rapidapi.com/sms',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'x-rapidapi-host': 'sms77io.p.rapidapi.com',
    'x-rapidapi-key': '72203f99d0msh2f36949da9383c8p13ad7cjsn8de13c368bb7'
  },
  data: {
    to: '+918341692103',
    p: 'euzYrVA7HkCbnnAJQR9AzxzfwPO4JYGw',
    text:`OTP for forgot password is:${otp}`
  }
};

axios.request(options).then(function (response) {
    console.log(response.data);
}).catch(function (error) {
    console.error(error);
});


//D7sms api

const options = {
  method: 'POST',
  url: 'https://d7sms.p.rapidapi.com/secure/send',
  headers: {
    'content-type': 'application/json',
    authorization: 'Basic cnhlZjE3Mjc6TEdDYUJQUWg=',
    'x-rapidapi-host': 'd7sms.p.rapidapi.com',
    'x-rapidapi-key': '72203f99d0msh2f36949da9383c8p13ad7cjsn8de13c368bb7'
  },
  data: {content: 'Test Message', from: 'D7-Rapid', to:9380556175}
};

axios.request(options).then(function (response) {
    console.log(response.data);
}).catch(function (error) {
    console.error(error);
});


//text api

var options = {
  method: 'POST',
  url: 'https://textbelt.com/text',
  headers: {'content-type': 'application/json'},
  data: {
      phone: '+919380556175',
      message: 'Hello world',
      key: '8eb75639087ea8c8017b36c242b8d3c2ef2312beY2ePcZ8vIapo7W2nBdRUnoD7N',
  }
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});