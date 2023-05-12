/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { AiOutlinePlus } from "react-icons/ai";
import { GiChocolateBar } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { BsPencil } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import Swal from 'sweetalert2';
const Home = () => {
    const [chocolates, setChocolates] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/chocolates')
            .then(res => res.json())
            .then(data => setChocolates(data))
    }, [])
    console.log(chocolates);

    const handelDeleate = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            // if (result.isConfirmed) {
            //   
            //   )
            // }
            fetch(`http://localhost:5000/chocolate/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount === 1) {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    }

                    const remaning = chocolates.filter(chocolate => chocolate._id !== id)
                    setChocolates(remaning)
                })
        })
        console.log(id);

    }


    return (
        <div className='px-20 mt-7'>
            <Link to='/AddChocolate'><button className='flex items-center gap-3 border-gray-300 border py-1 px-2 rounded-md text-xl'><AiOutlinePlus />New Chocolate<GiChocolateBar /></button></Link>
            <table className="min-w-full mt-10 divide-y divide-gray-200">
                <thead className="bg-gray-50 ">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country/Factory</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {chocolates.map((item) => (
                        <tr key={item._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex-shrink-0 h-10 w-10">
                                    <img className="h-10 w-10 rounded-full" src={item.photo} alt='' />
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{item.country}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold  ">
                                    {item.category}
                                </span>
                            </td>
                            <td className="px-6 py-4 gap-4 flex whitespace-nowrap text-sm font-medium">
                                <Link to={`/update/${item._id}`} className='bg-red-300 p-2 rounded-md text-black text-xl'><BsPencil /></Link>
                                <button onClick={() => handelDeleate(item._id)} className='bg-red-300 p-2 rounded-md text-black text-xl'><AiOutlineClose /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default Home;