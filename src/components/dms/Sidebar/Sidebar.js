import React, { useState, useEffect } from "react";
import {
    FaChartLine,
    FaMotorcycle,
    FaCrown,
    FaCaretDown,
    FaCaretRight,
    FaUser,
    FaGlobeAmericas, FaRegBuilding, FaMapMarkedAlt,
    FaUsers,
    FaBook

} from "react-icons/fa";

export const Sidebar = ({ isOpen }) => {
    const [openMenu, setOpenMenu] = useState(localStorage.getItem("openMenu") || null);
    const [openSubMenu, setOpenSubMenu] = useState(localStorage.getItem("openSubMenu") || null);
    const [openSubSubMenu, setOpenSubSubMenu] = useState(localStorage.getItem("openSubSubMenu") || null);

    const handleMenuToggle = (menuName) => {
        const newOpenMenu = openMenu === menuName ? null : menuName;
        setOpenMenu(newOpenMenu);
        setOpenSubMenu(null); // Close any open submenus when switching menus

        // Save state in localStorage
        localStorage.setItem("openMenu", newOpenMenu);
    };

    const handleSubMenuToggle = (subMenuName) => {
        const newOpenSubMenu = openSubMenu === subMenuName ? null : subMenuName;
        setOpenSubMenu(newOpenSubMenu);

        // Save state in localStorage
        localStorage.setItem("openSubMenu", newOpenSubMenu);
    };

    const handleSubSubMenuToggle = (SubsubMenuName) => {
        const newOpenSubSubMenu = openSubSubMenu === SubsubMenuName ? null : SubsubMenuName;
        setOpenSubSubMenu(newOpenSubSubMenu);

        // Save state in localStorage
        localStorage.setItem("openSubSubMenu", newOpenSubSubMenu);
    };

    // Close menus when clicking outside
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (!e.target.closest(".dms-sidebar")) {
                setOpenMenu(null);
                setOpenSubMenu(null);
                localStorage.removeItem("openMenu");
                localStorage.removeItem("openSubMenu");
                localStorage.removeItem("openSubSubMenu");
            }
        };

        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, []);

    return (
        <div className={`dms-sidebar bg-color text-white ${isOpen ? "open" : "closed"}`}>
            {/* Sidebar Header */}
            <div className="p-3 d-flex align-items-center sidebar-title">
                <a href="/" className="d-flex align-items-center text-white text-decoration-none">
                    {!isOpen ? (
                        < FaMotorcycle size={30} className="text-white d-none d-md-block" />
                    ) : (
                        < FaMotorcycle size={30} className="text-white d-block d-md-none" />
                    )}
                    {isOpen && <h4 className="mb-0 ms-2">DMS</h4>}
                </a>
            </div>
            <hr />

            {/* Sidebar Links */}
            <ul className="nav flex-column">
                {/* Dashboard */}
                <li className="dms-nav-item">
                    <div
                        className={`dms-nav-link text-white ${openMenu === "dashboard" ? "active" : ""}`}
                        onClick={() => handleMenuToggle("dashboard")}
                    >
                        <div className="d-flex align-items-center">
                            <FaChartLine className="me-2" />
                            <span className={isOpen ? "" : "d-none d-md-none d-sm-block"}>Dashboard</span>
                        </div>
                        <FaCaretDown
                            className={`ms-auto ${openMenu === "dashboard" ? "rotate" : ""} ${isOpen ? "hide-caret" : ""}`}
                            style={{ transition: "transform 0.3s", display: isOpen ? "inline-block" : "none" }}
                        />
                    </div>

                    {openMenu === "dashboard" && (
                        <ul className="submenu show">
                            <li className="dms-nav-item">
                                <div className="d-flex align-items-center">
                                    <FaCaretRight />
                                    <a href="/" className="dms-nav-link text-white">
                                        Dashboard 1
                                    </a>
                                </div>
                            </li>
                            <li className="dms-nav-item">
                                <div className="d-flex align-items-center">
                                    <FaCaretRight />
                                    <a href="/dashboard2" className="dms-nav-link text-white">
                                        Dashboard 2
                                    </a>
                                </div>
                            </li>
                            <li className="dms-nav-item">
                                <div className="d-flex align-items-center">
                                    <FaCaretRight />
                                    <a href="/dashboard3" className="dms-nav-link text-white">
                                        Dashboard 3
                                    </a>
                                </div>
                            </li>
                        </ul>
                    )}
                </li>

                {/* Company */}
                <li className="dms-nav-item">
                    <div
                        className={`dms-nav-link text-white ${openMenu === "company" ? "active" : ""}`}
                        onClick={() => handleMenuToggle("company")}
                    >
                        <div className="d-flex align-items-center">
                            <FaCrown className="me-2" />
                            <span className={isOpen ? "" : "d-none d-md-none d-sm-block"}>Company</span>
                        </div>
                        <FaCaretDown
                            className={`ms-auto ${openMenu === "user" ? "rotate" : ""} ${isOpen ? "hide-caret" : ""
                                }`}
                            style={{ transition: "transform 0.3s", display: isOpen ? "inline-block" : "none" }}
                        />
                    </div>
                    {openMenu === "company" && (
                        <ul className="submenu show">
                            <li className="dms-nav-item">
                                <div className="d-flex align-items-center">
                                    <FaCaretRight />
                                    <div
                                        className="dms-nav-link text-white"
                                        onClick={() => handleSubMenuToggle("company")}
                                    >
                                        Employee & Staff Management
                                    </div>
                                </div>
                                {openSubMenu === "company" && (
                                    <ul className="submenu show">
                                        <div >
                                            <li className="dms-nav-item">
                                                <div className="d-flex align-items-center">
                                                    <FaCaretRight />
                                                    <a href="/employee" className="dms-nav-link text-white">
                                                        All Employees
                                                    </a>
                                                </div>
                                            </li>
                                            <li className="dms-nav-item">
                                                <div className="d-flex align-items-center">
                                                    <FaCaretRight />
                                                    <a href="/department" className="dms-nav-link text-white">Department</a>
                                                </div>
                                            </li>
                                            <li className="dms-nav-item">
                                                <div className="d-flex align-items-center">
                                                    <FaCaretRight />
                                                    <a href="/designation" className="dms-nav-link text-white">Designation</a>
                                                </div>
                                            </li>
                                            <li className="dms-nav-item">
                                                <div className="d-flex align-items-center">
                                                    <FaCaretRight />
                                                    <a href="/employee-roles" className="dms-nav-link text-white">
                                                        Role
                                                    </a>
                                                </div>
                                            </li>
                                            <li className="dms-nav-item">
                                                <div className="d-flex align-items-center">
                                                    <FaCaretRight />
                                                    <a href="/role-permission" className="dms-nav-link text-white">
                                                        Roles-Permission
                                                    </a>
                                                </div>
                                            </li>
                                            <li className="dms-nav-item">
                                                <div className="d-flex align-items-center">
                                                    <FaCaretRight />
                                                    <a href="/activity-logs" className="dms-nav-link text-white">
                                                        Activity Logs
                                                    </a>
                                                </div>
                                            </li>
                                        </div>
                                    </ul>
                                )}
                            </li>
                        </ul>
                    )}
                </li>

                {/* Users */}
                <li className="dms-nav-item">
                    <a
                        href="/user"
                        className={`dms-nav-link text-white ${openMenu === "user" ? "active" : ""}`}
                        onClick={() => setOpenMenu("user")}
                    >
                         <div className="d-flex align-items-center">
                        <FaUser className="me-2" />
                        <span className={isOpen ? "" : "d-none d-md-none d-sm-block"}> User</span>
                        </div>
                    </a>
                </li>

                {/* States */}
                <li className="dms-nav-item">
                    <a
                        href="/state"
                        className={`dms-nav-link text-white ${openMenu === "state" ? "active" : ""}`}
                        onClick={() => setOpenMenu("state")}
                    >
                         <div className="d-flex align-items-center">
                        <FaGlobeAmericas className="me-2" />
                        <span className={isOpen ? "" : "d-none d-md-none d-sm-block"}> State</span>
                        </div>
                    </a>
                </li>

                {/* District */}
                <li className="dms-nav-item">
                    <a
                        href="/district"
                        className={`dms-nav-link text-white ${openMenu === "district" ? "active" : ""}`}
                        onClick={() => setOpenMenu("districs")}
                    >
                         <div className="d-flex align-items-center">
                        <FaMapMarkedAlt className="me-2" />
                        <span className={isOpen ? "" : "d-none d-md-none d-sm-block"}> District</span>
                        </div>
                    </a>
                </li>

                {/* Tehsil */}
                <li className="dms-nav-item">
                    <a
                        href="/tehsil"
                        className={`dms-nav-link text-white ${openMenu === "tehsil" ? "active" : ""}`}
                        onClick={() => setOpenMenu("tehsil")}
                    >
                         <div className="d-flex align-items-center">
                        <FaRegBuilding className="me-2" />
                        <span className={isOpen ? "" : "d-none d-md-none d-sm-block"}>Tehsil</span>
                        </div>
                    </a>
                </li>

                {/* Samaj Members */}
                <li className="dms-nav-item">
                    <a
                        href="/samaj-member"
                        className={`dms-nav-link text-white ${openMenu === "member" ? "active" : ""}`}
                        onClick={() => setOpenMenu("members")}
                    >
                         <div className="d-flex align-items-center">
                        <FaUsers className="me-2" />
                        <span className={isOpen ? "" : "d-none d-md-none d-sm-block"}> Samaj Members</span>
                        </div>
                    </a>
                </li>

                {/* Online Magazine */}
                <li className="dms-nav-item">
                    <a
                        href="/online-magazine"
                        className={`dms-nav-link text-white ${openMenu === "magazine" ? "active" : ""}`}
                        onClick={() => setOpenMenu("magazine")}
                    >
                         <div className="d-flex align-items-center">
                        <FaBook className="me-2" />
                        <span className={isOpen ? "" : "d-none d-md-none d-sm-block"}>Online Magazine</span>
                        </div>
                    </a>
                </li>

                {/* News */}
                <li className="dms-nav-item">
                    <a
                        href="/news"
                        className={`dms-nav-link text-white ${openMenu === "news" ? "active" : ""}`}
                        onClick={() => setOpenMenu("news")}
                    >
                         <div className="d-flex align-items-center">
                        <FaBook className="me-2" />
                        <span className={isOpen ? "" : "d-none d-md-none d-sm-block"}>News</span>
                        </div>
                    </a>
                </li>

                {/* Events */}
                <li className="dms-nav-item">
                    <a
                        href="/events"
                        className={`dms-nav-link text-white ${openMenu === "events" ? "active" : ""}`}
                        onClick={() => setOpenMenu("events")}
                    >
                         <div className="d-flex align-items-center">
                        <FaBook className="me-2" />
                        <span className={isOpen ? "" : "d-none d-md-none d-sm-block"}>Event</span>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    );
};
