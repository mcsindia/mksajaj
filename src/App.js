import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../src/styles/dms/global.css';
import './styles/web/webglobal.css';

/* Layouts */
import { AdminLayout } from './layouts/dms/AdminLayout/AdminLayout';

/* Pages */
import { Dashboard2 } from './pages/dms/DashboardPage/Dashboard2';
import { Dashboard1 } from './pages/dms/DashboardPage/Dashboard1';
import { Dashboard3 } from './pages/dms/DashboardPage/Dashboard3';

/* Employee Management */
import { EmployeeList } from './pages/dms/Employee/EmployeeList';
import { EmployeeAdd } from './pages/dms/Employee/EmployeeAdd';
import { EmployeeEdit } from './pages/dms/Employee/EmployeeEdit';

/* Role Management */
import { RolePermission } from './pages/dms/RolePermission/RolePermission';
import { RolePermissionAdd } from './pages/dms/RolePermission/RolePermissionAdd';
import { RolePermissionEdit } from './pages/dms/RolePermission/RolePermissionEdit';

/* Users */
import { UserList } from './pages/dms/UserManagement/UserList';
import { UserAdd } from './pages/dms/UserManagement/UserAdd';
import { UserEdit } from './pages/dms/UserManagement/UserEdit';

/* States */
import { StatesList } from './pages/dms/States/StatesList';
import { StatesAdd } from './pages/dms/States/StatesAdd';
import { StatesEdit } from './pages/dms/States/StatesEdit';

/* Events */
import { EventsList } from './pages/dms/Events/EventsList';
import { EventAdd } from './pages/dms/Events/EventAdd';
import { EventEdit } from './pages/dms/Events/EventEdit';

/* News */
import { NewsList } from './pages/dms/News/NewsList';
import {NewsAdd} from './pages/dms/News/NewsAdd';
import {NewsEdit} from './pages/dms/News/NewsEdit';

/* Website */
import { Home } from './pages/web/Home/Home';
import { News } from './pages/web/News/News';
import { Events } from './pages/web/Events/Events';
import { NewsDetail } from './pages/web/News/NewsDetail';
import { EventsDetail } from './pages/web/Events/EventsDetail';
import { AboutUs } from './pages/web/AboutUS/AboutUs';
import { ContactUs } from './pages/web/ContactUs/ContactUs';
import { Member } from './pages/web/Registration/Member';
import { BrideGroom } from './pages/web/Registration/BrideGroom';

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        {/* Dashboard */}
        <Route path="/" element={<Dashboard3 />} />
        <Route path="/dashboard2" element={<AdminLayout><Dashboard1 /></AdminLayout>} />
        <Route path="/dashboard3" element={<Dashboard2 />} />

        {/* Employees */}
        <Route path="/employee" element={<EmployeeList />} />
        <Route path="/employee/add" element={<EmployeeAdd />} />
        <Route path="/employee/edit" element={<EmployeeEdit />} />

        {/* Role Management */}
        <Route path="/role-permission" element={<RolePermission />} />
        <Route path="/role-permission/add" element={<RolePermissionAdd />} />
        <Route path="/role-permission/edit" element={<RolePermissionEdit />} />

        {/* Users */}
        <Route path="/user" element={<UserList />} />
        <Route path="/user/add" element={<UserAdd />} />
        <Route path="/user/edit" element={<UserEdit />} />

        {/* States */}
        <Route path="/state" element={<StatesList />} />
        <Route path="/state/add" element={<StatesAdd />} />
        <Route path="/state/edit" element={<StatesEdit />} />

        {/* News */}
        <Route path='/news' element={<NewsList/>} />
        <Route path='/news/add' element={<NewsAdd/>} />
        <Route path='/news/edit' element={<NewsEdit/>} />

        {/* Events */}
        <Route path="/events" element={<EventsList />} />
        <Route path="/events/add" element={<EventAdd />} />
        <Route path="/events/edit" element={<EventEdit />} />

        {/* Website Home */}
        <Route path="/web" element={<Home />} />
        <Route path='/web/news' element={<News/>} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path='/web/events' element={<Events/>} />
        <Route path='/events/:id' element={<EventsDetail/>} />
        <Route path='/web/about-us' element={<AboutUs/>} />
        <Route path='/web/contact' element={<ContactUs/>} />
        <Route path='/web/registration/members' element={<Member/>} />
        <Route path='/web/registration/bride-groom' element={<BrideGroom/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
