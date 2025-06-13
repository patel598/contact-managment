import { Container } from 'react-bootstrap'
import Header from '../components/header'
import Footer from '../components/footer'
import { Outlet } from 'react-router'

const Layout = () => {
    return (
        <div className="min-vh-100 ">
            <Header />

            <Container>

                <div className="text-center mb-5">
                    <h1 className="display-4 fw-bold text-dark mb-3">
                        Contact Management System
                    </h1>
                </div>
                <div style={{minHeight:'calc(100vh - 315px'}} className="">
                    <Outlet />
                </div>

            </Container>

            <Footer />
        </div>

    )
}

export default Layout