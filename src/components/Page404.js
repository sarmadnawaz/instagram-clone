import React from 'react';
import { Link } from 'react-router-dom'

function Page404(){
    return (
        <div className='page_404'>
            <h2>Sorry, this page isn't available.</h2>
            <p>The link you followed may be broken, or the page may have been removed. <Link to="/">Go back to Instagram.</Link></p>
        </div>
    )
}

export default Page404;