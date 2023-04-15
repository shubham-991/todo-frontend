// import React, { useState } from 'react';
// import axios from 'axios';
// import './Signup.css';
// import { useNavigate } from 'react-router-dom';

// const Signup: React.FC = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const history = useNavigate();

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     try {
//       const {data} = await axios.post<{ token: string }>('/api/auth/signup', {
//         name,
//         email,
//         password,
//       });
//       if (data) {
//         localStorage.setItem("userInfo", JSON.stringify(data));
//         history('/todos');
//       }
//     } catch (error) {
//       console.error(error);
//       setError('Registration failed. Please try again.');
//     }
//   };

//   return (
//     <div className="signup">
//       <h2>Sign Up</h2>
//       <form onSubmit={handleSubmit}>
//         {error && <div className="error">{error}</div>}
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit"><h3>SignUp</h3></button>
//       </form>
//     </div>
//   );
// };

// export default Signup;
import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../Spinner/Spinner'; // import a loading spinner component

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSpinner, setShowSpinner] = useState(false); // add new state variable
  const history = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setShowSpinner(true); // show the spinner when the signup button is clicked
    try {
      const {data} = await axios.post<{ token: string }>('/api/auth/signup', {
        name,
        email,
        password,
      });
      if (data) {
        localStorage.setItem("userInfo", JSON.stringify(data));
        history('/todos');
      }
    } catch (error) {
      console.error(error);
      setError('Registration failed. Please try again.');
    }
    setShowSpinner(false); // hide the spinner after the signup process is completed
  };

  return (
    <div className="signup">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {showSpinner ? ( // show the spinner if the showSpinner state variable is true
          <Spinner />
        ) : (
          <button type="submit">
            <h3>SignUp</h3>
          </button>
        )}
      </form>
    </div>
  );
};

export default Signup;
