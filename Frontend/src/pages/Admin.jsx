// import React from 'react'
// import { useNavigate,Link } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect,useState } from 'react';
// import { getVoteDetails } from "../actions/voteActions"
// import {register} from "../actions/votedAction"
// import {logoutUser} from "../actions/userActions"

// const Admin = () => {
//   const dispatch = useDispatch();
//   const nav = useNavigate();

 

//   useEffect(() => {
//     dispatch(getVoteDetails());
//   }, [dispatch]);

//   const voteinfo = useSelector((state) => state.vote);

//   const { vote } = voteinfo;

//   const handelogout = ()=>{
//     dispatch(logoutUser())
//     nav("/")
//   }
  

//   return (
//     <>
//     <nav className='w-full h-5   p-5 bg-slate-300 flex items-center justify-end px-6'>
//      <button className=' p-1  bg-red-400 rounded text-2  ' onClick={()=> handelogout()}>
//        Logout
//      </button>
//     </nav>
//     <div className="bg-grey-lighter h-full my-[5%]  flex flex-col">
//       <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
//         <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
//           <h1 className="mb-8 text-3xl text-center">Vote</h1>
//           <form >
//             {
//               vote.map((item, index) => (
//                 <div className='flex w-full p-3 justify-between border ' key={item._id}>
                  
//                   <p className='text-xl'>{item.name}</p>
//                    <p className='text-xl'>{item.voteCount}</p>
//                 </div>

                
//               ))
//             }
//             <div className='flex justify-between gap-3'>
//               <button
           
//                 className="w-full text-center py-3 mt-3 bg-blue-400 rounded bg-green text-black hover:bg-green-dark focus:outline-none my-1"
//               >
//                 <Link to="/create">
//                Create Candidates
//                 </Link>
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//       <table className="min-w-full divide-y divide-gray-200">
//   <thead className="bg-gray-50">
//     <tr>
//       <th
//         scope="col"
//         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//       >
//         Name
//       </th>
//       <th
//         scope="col"
//         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//       >
//         Age
//       </th>
//       <th
//         scope="col"
//         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//       >
//         Email
//       </th>
//     </tr>
//   </thead>
//   <tbody className="bg-white divide-y divide-gray-200">
//     <tr>
//       <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
//       <td className="px-6 py-4 whitespace-nowrap">30</td>
//       <td className="px-6 py-4 whitespace-nowrap">john@example.com</td>
//     </tr>
//     <tr>
//       <td className="px-6 py-4 whitespace-nowrap">Jane Smith</td>
//       <td className="px-6 py-4 whitespace-nowrap">25</td>
//       <td className="px-6 py-4 whitespace-nowrap">jane@example.com</td>
//     </tr>
//     {/* Add more rows as needed */}
//   </tbody>
// </table>

//     </div>
//     </>
//   )
// }

// export default Admin
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getVoteDetails } from '../actions/voteActions';
import { logoutUser } from '../actions/userActions';
import { Create, deleteVote, update } from '../actions/voteActions';

const Admin = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  useEffect(() => {
    dispatch(getVoteDetails());
  }, [dispatch, getVoteDetails]);

  const voteInfo = useSelector((state) => state.vote);
  const { vote } = voteInfo;

  const handleLogout = () => {
    dispatch(logoutUser());
    nav('/');
  };

  const [candidateName, setCandidateName] = useState('');
  const [updatename, setupdatename] = useState('');
  const [updatedCandidateId, setUpdatedCandidateId] = useState(null);

  const handleCreate = (e) => {
    e.preventDefault();
    if (candidateName.trim() !== '') {
      dispatch(Create(candidateName));
      setCandidateName('');
    }
  };

  const handleDelete = (id, index) => {
    dispatch(deleteVote(id, index));
  };

  const handleEdit = (id) => {
    setupdatename('');
    setUpdatedCandidateId(id);
  };

  const handleUpdate = (id) => {
    dispatch(update(updatename, id));
   
    setUpdatedCandidateId(null);
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [candidatesPerPage] = useState(5);

  // Get current candidates
  const indexOfLastCandidate = currentPage * candidatesPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
  const currentCandidates = vote.slice(indexOfFirstCandidate, indexOfLastCandidate);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <nav className='w-full h-5 p-5 bg-slate-300 flex items-center justify-end px-6'>
        <button className='p-1 bg-red-400 rounded text-2' onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <div className='bg-grey-lighter h-full my-[2%] flex flex-col items-center'>
        <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
          <h1 className='mb-8 text-3xl text-center'>Vote</h1>
          <div className='mb-4'>
            <form onSubmit={handleCreate}>
              <input
                type='text'
                className='block border border-grey-light w-full p-3 rounded mb-4'
                placeholder='Enter candidate name'
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
              />
              <button
                type='submit'
                className='w-full text-center py-3 bg-blue-400 rounded bg-green text-black hover:bg-green-dark focus:outline-none my-1'
              >
                Create Candidate
              </button>
            </form>
          </div>
          <table className='w-full'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='px-10 py-2'>Name</th>
                <th className='px-4 py-2'>Votes</th>
                <th className='px-4 py-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCandidates.map((item, index) => (
                <tr key={index} className='bg-white'>
                  <td className='border px-6 py-2'>
                    {updatedCandidateId === item._id ? (
                      <input
                        type='text'
                        className='w-full outline-none'
                     
                        value={updatename}
                        onChange={(e) => setupdatename(e.target.value)}
                      />
                    ) : (
                      <p>{item.name}</p>
                      )}
                  </td>
                  <td className='border px-4 py-2'>{item.voteCount}</td>
                  <td className='border px-4 py-2 flex gap-2'>
                    {updatedCandidateId === item._id ? (
                      <button className='p-1 bg-yellow-100 rounded-lg' onClick={() => handleUpdate(item._id)}>
                        Save
                      </button>
                    ) : (
                      <button
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
                        onClick={() => handleEdit(item._id)}
                      >
                        Edit
                      </button>
                    )}
                    <button
                      className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full'
                      onClick={() => handleDelete(item._id, index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className='flex justify-center mt-4'>
            {Array.from({ length: Math.ceil(vote.length / candidatesPerPage) }, (_, i) => i + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                className='mx-1 px-3 py-1 bg-blue-400 text-white rounded-md hover:bg-blue-500'
                onClick={() => paginate(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
