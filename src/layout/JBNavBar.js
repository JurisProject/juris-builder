import React, {useState} from 'react';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from 'reactstrap'
import { Link, Router } from 'components/Router'
import JurisLogo from '../../node_modules/juris-branding/images/Juris-Word-Logo-White.png';

const JBNavBar = ({hide}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return hide ? null : (
        <Navbar id="jb-header" expand="md" dark color="dark" className={hide ? 'hide' : 'show'}>
        <NavbarBrand tag={Link} to="/">
            <img src={JurisLogo} alt="Juris, PBC"/>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
          <NavItem>
              <NavLink tag={Link} to="https://open.getjuris.com">Back</NavLink>
            </NavItem>
          <NavItem>
              <NavLink tag={Link} to="/builder">Builder</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="https://github.com/jurislibrary">Template Library</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="https://github.com/JurisProject/juris-builder" target="_blank">GitHub</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    )
}

export default JBNavBar;