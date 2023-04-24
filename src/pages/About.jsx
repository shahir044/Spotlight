import {Link} from "react-router-dom";

function About() {
    return(
        <div className='container card rounded'>
            <h1 className='text-3xl font-bold mb-4'>Spotlight By Shahir Rahman <Link to={`/user/shahir044`} className='text-base-content text-opacity-70 text-blue-800'>
                shahir044
            </Link>
            </h1>
            <h3 className='text-xl  mb-4'>You can search for github users here, visit their profiles and see the necessary info of that user.</h3>
            <h5>version: 1.0.0</h5>
        </div>
    )
}
export default About;