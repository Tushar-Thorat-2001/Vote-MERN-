import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { Create } from '../actions/voteActions';

const CreateCandidate = () => {
  const dispatch = useDispatch();
  const createinfo = useSelector((state) => state.vote);
  const {success} = createinfo;
  const [create, setCreate] = useState('');
  const [temp, settemp] = useState('');

  const handleCreate = (e) => {
    e.preventDefault();
    if (create.trim() !== '') {
      settemp(create)
      dispatch(Create(create));
      setCreate("")
    }
  };

  return (
    <div className="bg-grey-lighter h-full my-[5%]  flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Create Candidate</h1>
          <form onSubmit={handleCreate}>
            <label htmlFor="createInput" className="mb-4 block text-sm font-medium text-gray-700">
              Candidate Name
            </label>
            <input
              id="createInput"
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="text"
              placeholder="Enter Candidate Name"
              value={create}
              onChange={(e) => setCreate(e.target.value)}
            />
            <div className="flex gap-4">
              <button
                type="submit"
                className="w-1/2 text-center py-3 bg-blue-400 rounded bg-green text-black hover:bg-green-dark focus:outline-none my-1"
              >
                Create
              </button>
              <button className="w-1/2 text-center py-3 bg-blue-400 rounded bg-green text-black hover:bg-green-dark focus:outline-none my-1">
                <Link to="/admin">Dashboard</Link>
              </button>

            </div>
              {success ? (<div className='text-2 text-blue-300 font-semibold'>Created Successfully {temp}</div>):""}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCandidate;
