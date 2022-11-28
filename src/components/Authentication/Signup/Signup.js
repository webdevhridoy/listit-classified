import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { authContext } from '../../../context/AuthProvider';
import useTitle from '../../Hook/useTitle';

const Signup = () => {
    useTitle('Sign Up');
    const { createUser, providerLogin, updateUser } = useContext(authContext);
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.from?.state?.pathname || '/';

    const handleSignUp = (data) => {
        // console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                // console.log(user);

                const profile = {
                    displayName: data.name
                };
                updateUser(profile)
                    .then(() => {
                    })
                    .catch(error => {
                        console.log(error);
                    });
                const users = {
                    name: data.name,
                    email: data.email,
                    role: data.role,
                    status: 'Unverified'
                };

                fetch('https://listit-classified-server.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(users)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        navigate('/');
                        Swal.fire({
                            text: 'Registration Succesful'


                        });
                    });

                const currentUser = {
                    email: user.email
                };

                fetch('https://listit-classified-server.vercel.app/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(currentUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        localStorage.setItem('listit-classified', data.token);
                        navigate(from, { replace: true });
                        toast.success('Thank you for login');
                    });


            })
            .catch(error => {
                console.log(error);
            });
    };
    const handleGoogleSignIn = () => {
        providerLogin()
            .then((result) => {
                const user = result.user;
                // console.log(user);

                const currentUser = {
                    email: user.email
                };

                fetch('https://listit-classified-server.vercel.app/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(currentUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        localStorage.setItem('listit-classified', data.token);
                        navigate(from, { replace: true });
                        toast.success('Thank you for login');
                    });
            })
            .catch((err) => console.error(err));
    };
    return (
        <div className="flex items-center justify-center text-center h-screen">
            <form onSubmit={handleSubmit(handleSignUp)} noValidate="" action="" className="flex flex-col w-full max-w-lg p-12 rounded shadow-lg ng-untouched ng-pristine ng-valid  bg-black text-white">
                <label htmlFor="username" className="self-start text-xs font-semibold"> Name</label>
                <input {...register('name')} className="flex items-center text-black h-12 px-4 mt-2 rounded focus:outline-none focus:ring-2" />
                <label htmlFor="password" className="self-start mt-3 text-xsfont-semibold">Email</label>
                <input {...register('email')} className="flex items-center h-12 text-black px-4 mt-2 rounded focus:outline-none focus:ring-2" />
                <label htmlFor="password" className="self-start mt-3 text-xsfont-semibold">Password</label>
                <input type='password' {...register('password')} className="flex items-center h-12 text-black px-4 mt-2 rounded focus:outline-none focus:ring-2" />

                <label htmlFor="password" className="self-start mt-3 text-xsfont-semibold">Role</label>
                <select className='mt-5 py-2 text-black' {...register('role')}>
                    <option className='text-black' > Buyer</option>
                    <option className='text-black' > Seller</option>
                </select>
                <button type="submit" className="flex items-center justify-center bg-white text-black mt-5 h-12 ">Signup</button>

                <button onClick={handleGoogleSignIn} aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 mt-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                        <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                    </svg>
                    <p>Login with Google</p>
                </button>

                <div className="flex justify-center mt-6 space-x-2 text-xs">
                    <a rel="noopener noreferrer" href="/" >Already have an account ?</a>
                    <span >/</span>
                    <Link rel="noopener noreferrer" to="/login" >Login</Link>
                </div>
            </form>
        </div>
    );
};

export default Signup;