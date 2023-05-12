/* eslint-disable no-unused-vars */
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateChocoolate = () => {
    const data = useLoaderData()
    console.log(data);
    const handelAddChocolate = e => {
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const country = form.country.value;
        const category = form.category.value;
        const photo = form.photo.value;
        const newChocolate = { name, country, category, photo }
        console.log(newChocolate);

        if (name.length === 0 || country.length === 0 || category.length === 0 || photo.length === 0) {
            return;
        }
        console.log(newChocolate);

        fetch(`http://localhost:5000/chocolate/${data._id}`,{
            method:'PUT',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(newChocolate)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.modifiedCount > 0){
                Swal.fire(
                    'Chocolate data updated',
                    'You clicked the button!',
                    'success'
                  )
                  form.reset()
            }
            form.reset()
        })

    }
    return (
        <div className='px-20  mt-10'>
            <h1 className='text-center text-2xl font-semibold'>Update Chocolates</h1>
            <p className='text-center text-gray-700 font-semibold'>Use the below form to Update a product</p>
            <div className='flex justify-center'>
                <form onSubmit={handelAddChocolate} className="w-full max-w-2xl bg-white rounded-lg shadow-lg px-24 py-6">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2 text-sm" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            name='name'
                            type="text" 
                            defaultValue={data.name}
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2 text-sm" htmlFor="country">
                            Country
                        </label>
                        <input
                            className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="country"
                            name='country'
                            defaultValue={data.country}
                            type="text"
                            placeholder="Enter your country"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2 text-sm" htmlFor="country">
                            Photo URL
                        </label>
                        <input
                            className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="photo"
                            name='photo'
                            defaultValue={data.photo}
                            type="text"
                            placeholder="Enter your chocolate photo"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2 text-sm" htmlFor="category">
                            Category
                        </label>
                        <div className="relative">
                            <select
                                className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="category"
                                name="category"
                                defaultValue={data.category}
                            >
                                <option value="">Select a category</option>
                                <option value="Dark Chocolate">Dark Chocolate</option>
                                <option value="Milk Chocolate">Milk Chocolate</option>
                                <option value="White Chocolate">White Chocolate</option>
                                <option value="Semi-sweet Chocolate">Semi-sweet Chocolate</option>
                                <option value="Bitter Chocolate">Bitter Chocolate</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg
                                    className="fill-current h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        d="M10 12l-5-5 1.41-1.41L10 9.17l3.59-3.58L15 7l-5 5z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            className="bg-blue-500 hover:bg-brown-700 text-black font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>



        </div>
    );
};

export default UpdateChocoolate;