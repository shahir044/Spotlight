import {FaHashtag} from "react-icons/fa";
function Footer() {
    const footerYear = new Date().getFullYear();
    return(
        <footer className='footer p-10 bg-gray-700 text-primary-content footer-center'>
            <div>
                <FaHashtag className='mr-2 text-2xl'/>
                <p>Copyright &copy; {footerYear} Shahir Rahman</p>
            </div>
        </footer>
    )
}

export default Footer;