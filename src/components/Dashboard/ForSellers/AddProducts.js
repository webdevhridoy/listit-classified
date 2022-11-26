import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { authContext } from '../../../context/AuthProvider';
import Loader from '../../Loader/Loader';

const AddProducts = () => {
    const { user } = useContext(authContext);
    console.log(user);
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const { data: categories = [], isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/categories');
            const data = res.json();
            return data;
        }
    });

    if (isLoading) {
        return <Loader></Loader>;
    }


    const current = new Date();
    const utcDate = new Date(current.getUTCFullYear(), current.getUTCMonth(), current.getUTCDate(), current.getUTCHours(), current.getUTCMinutes(), current.getUTCSeconds(), current.getUTCMilliseconds());

    const handleSignIn = (data) => {
        console.log(data);
        const image = data.img[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = 'https://api.imgbb.com/1/upload?key=a6f9b9970dcebe796e264ecdc5083f85';
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                console.log(imgData);
                if (imgData.success) {
                    console.log(imgData.data.url);


                    const products = {
                        sellername: data.sellername,
                        productname: data.productname,
                        categoryId: data.category,
                        condition: data.condition,
                        description: data.description,
                        location: data.location,
                        mobile: data.mobile,
                        originalprice: data.originalprice,
                        resaleprice: data.resaleprice,
                        yearsofuse: data.yearsofuse,
                        img: imgData.data.url,
                        utcDate,
                        categoryName: categories.find(cat => cat._id === data.category)['categoryname'],
                        email: user?.email || 'Unregisterd'
                    };

                    console.log(products);

                    // save information to the database;

                    fetch('http://localhost:5000/products', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(products)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            navigate('/dashboard/myproducts');
                            Swal.fire({
                                text: 'Product added succssfully'
                            });
                        });

                }
            });


    };
    return (
        <div >
            <form onSubmit={handleSubmit(handleSignIn)} novalidate="" action="" className="flex flex-col w-full  p-12 rounded shadow-lg ng-untouched ng-pristine ng-valid  bg-black text-white">

                <label for="password" className="self-start mt-3 text-xs font-semibold">Seller Name</label>
                <input {...register('sellername', { required: 'Field is required' })} className="flex items-center h-12 text-black px-4 mt-2 rounded focus:outline-none focus:ring-2" />


                <label for="username" className="self-start text-xs font-semibold"> Product Name</label>
                <input {...register('productname', { required: 'Field is required' })} className="flex items-center text-black h-12 px-4 mt-2 rounded focus:outline-none focus:ring-2" />

                <label for="password" className="self-start mt-3 text-xs font-semibold">Mobile Number</label>
                <input {...register('mobile', { required: 'Field is required' })} className="flex items-center h-12 text-black px-4 mt-2 rounded focus:outline-none focus:ring-2" />

                <label for="password" className="self-start mt-3 text-xs font-semibold">Location</label>
                <input {...register('location', { required: 'Field is required' })} className="flex items-center h-12 text-black px-4 mt-2 rounded focus:outline-none focus:ring-2" />

                <label for="password" className="self-start mt-3 text-xs font-semibold">Resale Price</label>
                <input {...register('resaleprice', { required: 'Field is required' })} className="flex items-center h-12 text-black px-4 mt-2 rounded focus:outline-none focus:ring-2" />

                <label for="password" className="self-start mt-3 text-xs font-semibold">Original Price</label>
                <input {...register('originalprice', { required: 'Field is required' })} className="flex items-center h-12 text-black px-4 mt-2 rounded focus:outline-none focus:ring-2" />

                <label for="password" className="self-start mt-3 text-xs font-semibold">Years of Use</label>
                <input {...register('yearsofuse', { required: 'Field is required' })} className="flex items-center h-12 text-black px-4 mt-2 rounded focus:outline-none focus:ring-2" />

                <label for="password" className="self-start mt-3 text-xsfont-semibold">Category</label>
                <select className='mt-5 py-2 text-black' {...register('category', { required: 'Field is required' })}>

                    {
                        categories.map(categories =>

                            <option className='text-black'

                                key={categories._id}
                                value={categories._id}
                            > {categories.categoryname}</option>
                        )
                    }


                </select>

                <label for="password" className="self-start mt-3 text-xsfont-semibold">Condition</label>
                <select className='mt-5 py-2 text-black' {...register('condition', { required: 'Field is required' })}>
                    <option className='text-black' > Excellent</option>
                    <option className='text-black' > Good</option>
                    <option className='text-black' > Fair</option>
                </select>

                <label className="label"> <span className="label-text text-white">Photo</span></label>
                <input type="file" {...register("img", {
                    required: 'Photo is required'
                })} className="input input-bordered w-full max-w-xs text-black" />

                <label for="password" className="self-start mt-3 text-xs font-semibold">Description</label>
                <input {...register('description', { required: 'Field is required' })} className="flex items-center h-12 text-black px-4 mt-2 rounded focus:outline-none focus:ring-2" />


                <button type="submit" className="flex items-center justify-center bg-white text-black mt-5 h-12 ">Add Now</button>


            </form>

        </div>
    );
};

export default AddProducts;