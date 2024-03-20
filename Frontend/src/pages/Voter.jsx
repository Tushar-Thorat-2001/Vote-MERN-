import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getVoteDetails } from "../actions/voteActions";
import { register } from "../actions/votedAction";
import {logoutUser} from "../actions/userActions"

const Voter = () => {
  const dispatch = useDispatch();

  const nav = useNavigate();

  const [voteid, setVoteId] = useState("");

  useEffect(() => {
    dispatch(getVoteDetails());
  }, [dispatch]);

  const voteinfo = useSelector((state) => state.vote);
  const votedinfo = useSelector((state) => state.voted);
  const { vote } = voteinfo;
  const {success} = votedinfo;
  const userLogin = useSelector((state) => state.auth);
  const { loading, error, userInfo } = userLogin; 
  
  const handle = (e) => {
    e.preventDefault();
    dispatch(register(userInfo._id, voteid,userInfo.email));
    nav("/completed")
  }
  
  // useEffect(()=>{
  //   if(success){
  //     nav("/completed")
  //   }
  // })

  
  const handelogout = ()=>{
    dispatch(logoutUser())
    nav("/")
  }
  
  return (
    <>
       <nav className='w-full h-5   p-7 bg-slate-300 flex items-center justify-around px-6'>
        <p className='text-xl font-semibold '>Voting</p>
     <button className=' p-1  bg-red-400 rounded text-2  ' onClick={()=> handelogout()}>
       Logout
     </button>
     
     </nav>
     {success ? <div className='text-4xl flex justify-center items-center w-full h-full flex-col '><p className='p-10'>YOU already Voted</p></div>:
     
     
     
    <div className="bg-grey-lighter h-full my-[5%]  flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Vote</h1>
          <form onSubmit={handle}>
            {
              vote.map((item, index) => (
                <div className='flex w-full p-3 justify-between border ' key={item._id}>
                  <input
                    type="radio"
                    className='size-4'
                    name="candidate"
                    value={item._id}
                    checked={voteid === item._id}
                    onChange={(e) => setVoteId(e.target.value)}
                  />
                  <p className='text-xl'>{item.name}</p>
                </div>
              ))
            }
            <div className='flex justify-between gap-3'>
              <button
                type='submit'
                className="w-full text-center py-3 mt-3 bg-blue-400 rounded bg-green text-black hover:bg-green-dark focus:outline-none my-1"
              >
               Vote
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
     }
    </>
  )
}

export default Voter