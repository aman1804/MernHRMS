import React from 'react';
import { Navbar, Nav, Button, Container, Row, Col, Collapse } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

const Sidebar = ({ Element }) => {
  const menuItems = [
    { MainMenuId: 0, MenuItemId: 1, MenuItemName: 'Menu 1', WebpageLink: '/menu1' },
    { MainMenuId: 1, MenuItemId: 2, MenuItemName: 'Submenu 1-1', WebpageLink: '/submenu1' },
    { MainMenuId: 0, MenuItemId: 3, MenuItemName: 'Menu 2', WebpageLink: '/menu2' },
  ];

  return (
    <div>
      <Navbar className="sticky-top bg-theme" id="navbar">
        <Container fluid>
          <Button
            className="btn btn-outline-light btn-sm border border-white border-2 d-lg-none d-block"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasScrolling"
            aria-controls="offcanvasScrolling"
          >
            <i className="bi bi-list" />
          </Button>
          <Navbar.Brand className="text-white" href="/index">
            Logic Vertix
          </Navbar.Brand>
          <div className="text-white" id="greeting">
            Hi, {`{greeting}`}!
          </div>
          {/* Navigation buttons section */}
          <div id="nav-buttons">
            <Link
              to="/home"
              className="btn btn-outline-light btn-sm border border-white border-2"
            >
              <i className="bi bi-house" />
            </Link>
            <Button className="btn btn-outline-light btn-sm border border-white border-2">
              <i className="bi bi-person-circle" />
            </Button>
            <Button className="btn btn-outline-light btn-sm border border-white border-2">
              <i className="bi bi-bell " />
            </Button>
            <Link
              to="/auth/logout"
              className="btn btn-outline-light btn-sm border border-white border-2"
              onClick={() => localStorage.clear()}
            >
              <i className="bi bi-box-arrow-right " />
            </Link>
          </div>
        </Container>
      </Navbar>

      <Container fluid>
        <Row>
          {/* Sidebar section */}
          <Col lg={2} style={{ backgroundColor: '#0e223d' }}>
            {/* Sidebar content */}
            <div
              className="flex-shrink-0 p-1"
              style={{ width: '198px', backgroundColor: '#0e223d' }}
            >
              {/* Sidebar logo and name */}
              <ul className="list-unstyled">
                <li className="text-center">
                  <img
                    src="path-to-image"
                    className="img rounded mx-auto"
                    height="90vh"
                    width="90vh"
                    alt="Profile"
                  />
                </li>
                <li id="employee_details">
                  <div className="text-white text-center my-2">
                    <div>
                      <b>EmpId</b>
                    </div>
                    <div>
                      Hi, <b>EmpName</b>
                    </div>
                  </div>
                  <hr style={{ backgroundColor: '#FFFFFF' }} />
                </li>
              </ul>
              {/* Search input box */}
              <div
                className="form-control form-control-sm d-flex mb-2"
                style={{ width: '85%' }}
              >
                <i className="bi bi-search icon-search me-1" id="icon-search"></i>
                <input
                  type="text"
                  className="input-field d-inline"
                  id="search_input"
                  placeholder=" Search"
                />
              </div>
              {/* Sidebar menu */}
              {/* create a div with scrollbar */}
              <div className="overflow-y-scroll scrollbar pb-4" id="scrollbar">
                {/* create an unordered list for the menu items */}
                <ul className="list-unstyled ps-0" id="menu-items">
                  {/* Loop through the main menu items */}
                  {menuItems.map((main_menu) =>
                    main_menu.MainMenuId === 0 && (
                      <li key={main_menu.MenuItemId} className="mb-1">
                        <Button
                          id={`${main_menu.MenuItemId}-collapse-btn`}
                          className="btn btn-toggle d-inline-flex rounded border-0 collapsed text-white"
                          data-bs-toggle="collapse"
                          data-bs-target={`#${main_menu.MenuItemId}-collapse`}
                          aria-expanded="false"
                          aria-controls={`${main_menu.MenuItemId}-collapse`}
                          title={main_menu.MenuItemName}
                        >
                          {main_menu.MenuItemName}
                        </Button>
                        <Collapse id={`${main_menu.MenuItemId}-collapse`}>
                          <ul className="btn-toggle-nav list-unstyled fw-normal small">
                            {/* Loop through the submenu items */}
                            {menuItems.map((sub_menu) =>
                              sub_menu.MainMenuId === main_menu.MenuItemId && (
                                <li
                                  key={sub_menu.MenuItemId}
                                  className="ps-4 text-white border-bottom rounded"
                                >
                                  <Link
                                    to={sub_menu.WebpageLink}
                                    className="link-dark d-inline-flex text-decoration-none rounded"
                                    style={{ height: 'auto', color: 'inherit' }}
                                  >
                                    <Button
                                      type="button"
                                      className="sub-menu-btn"
                                      data-bs-target="#spinner_modal"
                                      data-bs-toggle="modal"
                                      style={{
                                        border: 'none',
                                        backgroundColor: 'transparent',
                                        color: 'inherit',
                                        fontFamily: 'inherit',
                                        fontSize: 'inherit',
                                        cursor: 'pointer',
                                      }}
                                      title={sub_menu.MenuItemName}
                                    >
                                      {sub_menu.MenuItemName}
                                    </Button>
                                  </Link>
                                </li>
                              )
                            )}
                          </ul>
                        </Collapse>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            <div className="b-example-divider b-example-vr "></div>
          </Col>

          <Col lg={10} className="sidescroll pb-5">
            {/* Block of content that will be replaced in child templates */}
            <Element />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Sidebar;
