import React, { useEffect, useState } from 'react';
import { useSignInUserMutation } from '../redux/api/authApi';
import { useDispatch } from 'react-redux';
import { signIn } from '../redux/slice/authSlice';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const [signInUserWithApi, { data, isSuccess }] = useSignInUserMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const datas = { email, password };

  const handleSubmit = (e) => {
    e.preventDefault();
    signInUserWithApi(datas);
  };

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(signIn(data));
      navigate("/")
    }
  }, [isSuccess, data, dispatch]);

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <div className="flex items-center justify-between w-full mb-8">
        <Link to="/" className="text-4xl font-bold text-blue-600 hover:text-blue-800">
          Our Products
        </Link>
        <Link to="/login" className="text-xl font-semibold text-gray-700 hover:text-gray-900">
          Login
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 mt-[40px]">
        <input onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" type="email" placeholder="Email" required />
        <input onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" type="password" placeholder="Password" required />
        <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
