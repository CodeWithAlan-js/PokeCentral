import React from 'react';
import BerriesDetails from '../components/common/BerriesDetails';
import '@styles/BerriesPage.css';
import NavBar from '../components/common/NavBar';
import { Link } from 'react-router-dom';
import { IoCloseCircleOutline } from 'react-icons/io5';

const BerriesPage = () => {


    return(
        <>
        <NavBar/>
        <div className='berries-page-container'>
            <h2>List Of Berries</h2>
            <BerriesDetails/>
         </div>   
        </>
    )
}

export default BerriesPage;