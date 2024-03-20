import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';

const Signup = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  
  // State variables for form fields and error handling
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [nameerror,setnameerror] = useState(" ");
  const [phoneerror,setphoneerror] = useState(" ");
  const [passworderror,setpassworderror] = useState(" ");
  const [emailerror,setemailerror] = useState(" ");

  // Redux state for loading and error messages
  const userRegister = useSelector((state) => state.auth);
  const { loading, error: registrationErrormessage } = userRegister;

  // Handle form submission
  const handleRegister = (e) => {
    e.preventDefault();

    // Basic form validation
    if (!fullname || !Email || !Password || !phone) {
      setError('All fields are required.');

      if(!fullname){
        setnameerror("Name is required")
      }
      if(!Email){
        setemailerror("email is required")
      }
      if(!Password){
        setpassworderror("password is required")
      }
      if(!phone){
        setphoneerror("phone is required")
      }
      
      return;
    }

    // Dispatch register action
    dispatch(register(fullname, Email,Password , phone));

    // Reset form fields and error message
    setFullname('');
    setPhone('');
    setEmail('');
    setPassword('');
    setError('');
    setnameerror('');
    setpassworderror('');
    setemailerror('');
    setphoneerror('');

    // Navigate to home page or display success message after registration
    if(error === null){

      nav("/");
    }
  };

  return (
    <div className="bg-grey-lighter h-full my-[5%] flex flex-col">
      {error && <div className="text-red-500 text-center">{error}</div>}
      {registrationErrormessage && <div className="text-red-500 text-center">{registrationErrormessage}</div>}
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Register</h1>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="username"
              placeholder="UserName"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
             {nameerror && <div className="text-red-500 text-center">{nameerror}</div>}
           
            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passworderror && <div className="text-red-500 text-center">{passworderror}</div>}
            <input
              type="email"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
             {emailerror && <div className="text-red-500 text-center">{emailerror}</div>}
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="phone"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {phoneerror && <div className="text-red-500 text-center">{phoneerror}</div>}
            <button
              type="submit"
              className="w-full text-center py-3 bg-blue-400 rounded bg-green text-black hover:bg-green-dark focus:outline-none my-1 text-cyan-50"
              disabled={loading} // Disable button while loading
            >
              {loading ? 'Loading...' : 'Register'}
            </button>
            <button className="w-full text-center py-3 bg-blue-400 rounded bg-green text-black hover:bg-green-dark focus:outline-none my-1 text-cyan-50" onClick={()=>nav("/")}>
            
            Login
          
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;




// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { register } from '../actions/userActions';

// const Signup = () => {
//   const dispatch = useDispatch();
//   const nav = useNavigate();

//   const [formData, setFormData] = useState({
//     fullname: '',
//     phone: '',
//     email: '',
//     password: '',
//   });

//   const [errors, setErrors] = useState({});

//   const { loading, error: registrationErrorMessage } = useSelector((state) => state.auth);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     setErrors({ ...errors, [name]: '' }); // Clear the error when user starts typing
//   };

//   const handleRegister = (e) => {
//     e.preventDefault();

//     const { fullname, email, password, phone } = formData;
//     const newErrors = {};

//     if (!fullname) newErrors.fullname = 'Name is required';
//     if (!email) newErrors.email = 'Email is required';
//     if (!password) newErrors.password = 'Password is required';
//     if (!phone) newErrors.phone = 'Phone is required';

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     dispatch(register(fullname, email, password, phone));

//     // Reset form fields
//     setFormData({
//       fullname: '',
//       phone: '',
//       email: '',
//       password: '',
//     });

//     if (!loading && !registrationErrorMessage) {
//       nav('/');
//     }
//   };

//   return (
//     <div className="bg-grey-lighter h-full my-[5%] flex flex-col">
//       {registrationErrorMessage && <div className="text-red-500 text-center">{registrationErrorMessage}</div>}
//       <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
//         <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
//           <h1 className="mb-8 text-3xl text-center">Register</h1>
//           <form onSubmit={handleRegister}>
//             <input
//               type="text"
//               className="block border border-grey-light w-full p-3 rounded mb-4"
//               name="fullname"
//               placeholder="Full Name"
//               value={formData.fullname}
//               onChange={handleInputChange}
//             />
//             {errors.fullname && <div className="text-red-500 text-center">{errors.fullname}</div>}

//             <input
//               type="password"
//               className="block border border-grey-light w-full p-3 rounded mb-4"
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleInputChange}
//             />
//             {errors.password && <div className="text-red-500 text-center">{errors.password}</div>}

//             <input
//               type="email"
//               className="block border border-grey-light w-full p-3 rounded mb-4"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleInputChange}
//             />
//             {errors.email && <div className="text-red-500 text-center">{errors.email}</div>}

//             <input
//               type="text"
//               className="block border border-grey-light w-full p-3 rounded mb-4"
//               name="phone"
//               placeholder="Phone Number"
//               value={formData.phone}
//               onChange={handleInputChange}
//             />
//             {errors.phone && <div className="text-red-500 text-center">{errors.phone}</div>}

//             <button
//               type="submit"
//               className="w-full text-center py-3 bg-blue-400 rounded bg-green text-black hover:bg-green-dark focus:outline-none my-1 text-cyan-50"
//               disabled={loading} // Disable button while loading
//             >
//               {loading ? 'Loading...' : 'Register'}
//             </button>
//             <button className="w-full text-center py-3 bg-blue-400 rounded bg-green text-black hover:bg-green-dark focus:outline-none my-1 text-cyan-50" onClick={() => nav('/')}>
//               Login
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;
