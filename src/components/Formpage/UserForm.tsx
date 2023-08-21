import React, { useState } from 'react';

const UserForm: React.FC<{ onSubmit: () => void }> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const userDetails = {
      name,
      phone,
      email,
    };

    localStorage.setItem('userDetails', JSON.stringify(userDetails));
   
    console.log(userDetails);
    onSubmit();
}

   


    // useEffect(() => {
    //     const userDetails = localStorage.getItem('userDetails');
    
    //     if (!userDetails) {
    //       alert('You must enter your details before accessing this page.');
    //       window.location.href = '/second-page';
    //     }
    //   }, []);


    // my-5 ml-[90px] max-md:ml-[50px] py-2 border-2 rounded-xl  border-blue-300 focus:outline-none focus:ring-1 focus:ring-gray-700 focus:border-transparent
    // text-xl font-medium py-5
    // flex flex-col items-center justify-center mt-16 

  return (
    <>
    <div className="flex flex-col items-center justify-center mt-16 ">
      <h1 className='text-2xl font-bold'>Sign-Up Form</h1>
    <form onSubmit={handleSubmit}>
      <label className='text-md font-medium ' htmlFor="name">Name:</label>
      <input className='my-5 ml-[70px]  max-sm:w-[180px] py-2 pl-3 border-2 rounded-xl  border-blue-300 focus:outline-none focus:ring-1 focus:ring-gray-700 focus:border-transparent' type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      <br />
       <label className='text-md font-medium' htmlFor="phone">Phone number:</label>
      <input className='my-5 ml-2  max-sm:w-[180px] py-2 pl-3 border-2 rounded-xl  border-blue-300 focus:outline-none focus:ring-1 focus:ring-gray-700 focus:border-transparent' type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      <br />
    <label className='text-md font-medium' htmlFor="email">Email:</label>
      <input className='my-5 ml-[70px]  max-sm:w-[180px] py-2 pl-3 border-2 rounded-xl  border-blue-300 focus:outline-none focus:ring-1 focus:ring-gray-700 focus:border-transparent' type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <br />
      <div className="button flex items-center justify-center">
      <button className='text-center px-5 py-2 bg-blue-300 border-2 border-black rounded-lg' type="submit">Submit</button>
      </div>
    </form>
    </div>
      
    </>

  );
};

export default UserForm;
