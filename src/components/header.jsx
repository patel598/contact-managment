
import { Users } from "lucide-react";
import { Container, Navbar } from "react-bootstrap";
import { NavLink } from "react-router"; // Use NavLink for active class

const Header = () => {
    return (
        <Navbar expand="lg" className="mb-4 bg-dark">
            <Container>
                <Navbar.Brand className="d-flex align-items-center gap-2">
                    <NavLink to="/dashboard"
                        className="text-white text-decoration-none d-flex align-items-center gap-2"
                        style={({ isActive }) => ({
                            fontWeight: isActive ? 'bold' : 'normal',
                            opacity: isActive ? 1 : 0.8,
                        })}
                    >
                        <Users size={24} />
                        <span>Contact Manager</span>
                    </NavLink>
                </Navbar.Brand>
                <NavLink to="/create-form"
                    className="text-white text-decoration-none ms-auto"
                    style={({ isActive }) => ({
                        fontWeight: isActive ? 'bold' : 'normal',
                        opacity: isActive ? 1 : 0.8,
                    })}
                >
                    Create Contact
                </NavLink>
            </Container>
        </Navbar>
    );
};

export default Header;
