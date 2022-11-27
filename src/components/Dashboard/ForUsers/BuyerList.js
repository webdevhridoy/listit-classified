import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import useTitle from '../../Hook/useTitle';
import Loader from '../../Loader/Loader';

const BuyerList = () => {
    useTitle('Buyer List');
    const { data: buyers = [], isLoading, refetch } = useQuery({
        queryKey: ['buyer'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users/buyer');
            const data = await res.json();
            return data;
        }
    });
    if (isLoading) {
        return <Loader></Loader>;
    }

    const handleUserDelete = (buyer) => {
        fetch(`http://localhost:5000/users/${buyer._id}`, {
            method: 'DELETE',
            // headers: {
            //     authorization: `bearer ${localStorage.getItem('Access-Token')}`
            // }
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                refetch();
                if (data.deletedCount) {
                    toast.success('Buyer is deleted');
                }
            });
    };

    const handleMakeAdmin = (id) => {
        fetch(`http://localhost:5000/users/admin/${id}`, {
            method: 'PUT',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    toast.success('Your role has been changed');
                    refetch();
                }
            });
    };


    return (
        <div>
            <h2>Sellers List {buyers.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Change Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            buyers.map((buyer, index) => <tr key={buyer._id}>
                                <th>{index + 1}</th>
                                <td>{buyer.name}</td>
                                <td>{buyer.email}</td>
                                <td>{buyer.role}</td>
                                <td>
                                    {
                                        buyer?.role !== 'Admin' &&
                                        <Link onClick={() => handleMakeAdmin(buyer._id)}
                                            className='px-2 py-1 rounded-md text-white bg-rose-500'>Make Admin</Link>
                                    }
                                </td>
                                <td>
                                    <Link onClick={() => handleUserDelete(buyer)}
                                        className='px-2 py-1 rounded-md text-white bg-rose-500'>Delete</Link>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BuyerList;