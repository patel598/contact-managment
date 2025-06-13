import { Mail, PhoneCall } from 'lucide-react'
import { Container } from 'react-bootstrap'



const Footer = () => {
    return (
        <>
            <footer className="bg-dark text-white text-center py-4 mt-5">
                <Container>
                    <address className="mb-0 text-white text-decoration-none">
                        © 2025 Bharat Patel{" "}
                        <PhoneCall  size={15}/> : <a className="footer-link" href="tel:+919009024536">+919009024536 </a> 
                        <Mail  size={15}/>: <a className="footer-link" href="mailto:patelb598@gmail.com">patelb598@gmail.com</a>
                    </address>
                </Container>
            </footer>
        </>
    )
}

export default Footer