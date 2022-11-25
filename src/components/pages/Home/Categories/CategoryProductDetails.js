import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BookingModal from '../../Booking/BookingModal';

const CategoryProductDetails = ({ product }) => {
    const { productname, location, resaleprice, yearsofuse, img, utcDate, sellername, description, originalprice } = product;
    const [modalItem, setModalItem] = useState(null);
    // console.log(product);
    const [isWishAdd, setIsWishAdd] = useState(false);
    const [wishCount, setWishCount] = useState(0);

    const handleModal = (product) => {
        setModalItem(product);
    };


    const handleWishList = (product) => {
        console.log(product);
        setIsWishAdd(!isWishAdd);
    };

    const wishCountHandler = () => {
        handleWishList();
        if (!isWishAdd) {
            setWishCount(wishCount + 1);
            // fetch(`https://27.96.131.85:8443/api/likeBoards/${boards.id}`, {
            //     credentials: 'include',
            //     method: "POST",
            //     body: JSON.stringify({
            //         "liked": true
            //     }),
            // });

            // console.log("count+1");
        } else if (isWishAdd) {
            setWishCount(wishCount - 1);
            // fetch(`https://27.96.131.85:8443/api/likeBoards/${boards.id}`, {
            //     credentials: 'include',
            //     method: "DELETE",
            //     body: JSON.stringify({
            //         "liked": false
            //     })
            // });
            // console.log("count-1");
        }
    };

    return (
        <div className="flex flex-col max-w-lg p-6 space-y-6 overflow-hidden rounded-lg shadow-md text-black   ">
            <div className="flex space-x-4">
                <img alt="" src="https://source.unsplash.com/100x100/?portrait" className="object-cover w-12 h-12 rounded-full shadow  bg-gray-500" />
                <div className="flex flex-col space-y-1">
                    <Link rel="noopener noreferrer" href="#" className="text-sm font-semibold" alt>{sellername}</Link>
                    <span className="text-xs  text-gray-400">{utcDate}</span>
                </div>
            </div>
            <div>
                <div className='flex justify-center items-center'>
                    <img src={img} alt="" className="w-44 mb-4  bg-gray-500" />
                </div>
                <h2 className="mb-1 text-xl font-semibold">{productname}</h2>
                <p className="text-sm  text-gray-900"> Price: <span >{resaleprice}</span> <span className='line-through'>{originalprice}</span>
                </p>
                <p className="text-sm  text-gray-400">{description}</p>
            </div>
            <div className="flex flex-wrap justify-between">
                <div className="space-x-2">
                    <button aria-label="Location" type="button" className="p-2 text-center flex justify-between items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        <span>{location}</span>
                    </button>

                </div>
                <div className="flex space-x-2 text-sm  text-gray-400">
                    <button type="button" className="flex items-center p-1 space-x-1.5"> Used: {yearsofuse} Year
                    </button>
                    <button
                        onClick={wishCountHandler}
                        title='Wish List'
                        type="button"
                        className="flex items-center p-1 space-x-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:opacity-70" fill="none" viewBox="0 0 24 24" stroke="gray">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </button>
                </div>
                <button >
                    <label onClick={() => handleModal(product)}
                        htmlFor="my-modal"
                        className="btn">Book Now</label>
                </button>
            </div>
            {modalItem &&
                <BookingModal
                    product={product}
                    setModalItem={setModalItem}
                >
                </BookingModal>
            }
        </div>
    );
};

export default CategoryProductDetails;