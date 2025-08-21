// import React from "react";
// import { createBrowserRouter } from "react-router-dom";
// import Layout from "./layout";
// import AboutTemplates from "./components/templates/aboutTemplates";
// import HomeTemplates from "./components/templates/homeTemplates";
// import ProjectsTemplates from "./components/templates/projectsTemplates";
// import ProjectDetailTemplate from "./components/templates/projectsDetailTemplate";
// import NewsTemplates from "./components/templates/newsTemplates";
// import NewsDetailTemplate from "./components/templates/newsDetailTemplates";
// import KsmTemplates from "./components/templates/ksmTemplates";
// import KsmDetailTemplates from "./components/templates/ksmDetailTemplates";
// import ServiceTemplates from "./components/templates/serviceTemplates";
// import ServiceDetailsTemplates from "./components/templates/serviceDetailTemplates";
// import ServiceOfficeTemplates from "./components/templates/serviceOfficeTemplates";
// import CareerTemplates from "./components/templates/careerTemplates";
// import CareerDetailTemplates from "./components/templates/careerDetailTemplates";
// import ContactTemplates from "./components/templates/contactTemplates";
// import SpecialProjectsTemplates from "./components/templates/specialProjectsTemplates";
// import AdminLayout from "./pages/admin/AdminLayout";
// import AdminPage from "./pages/admin/AdminPage";
// import AdminAbout from "./pages/admin/AdminAbout";
// import SwaggerDocs from "./components/templates/SwaggerDocs";
// import AdminProjects from "./pages/admin/AdminProjects";
// import AdminKsm from "./pages/admin/AdminKsm";
// import AdminNews from "./pages/admin/AdminNews";
// import AdminContact from "./pages/admin/AdminContact";
// import AdminCareer from "./pages/admin/AdminCareer";
// import ProtectedRoute from "./pages/admin/component/ProtectedRoute";
// import LoginPage from "./pages/admin/context/AdminLoginPage";
// import AdminService from "./pages/admin/AdminService";



// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       {
//         path: "rrgroup",
//         children: [
//           {
//             path: "docs",
//             element: <SwaggerDocs />,
//           },          
//           {
//             path: "about", 
//             element: <AboutTemplates />,
//           },
//           {
//             path: "", 
//             element: <HomeTemplates />,
//           },
//           {
//             path: "news",
//             children: [
//               {
//                 path: "",
//                 element: <NewsTemplates />,
//               },
//               {
//                 path: ":slug", 
//                 element: <NewsDetailTemplate />,
//               },
//             ],
//           },
//           {
//             path: "layihələr",
//             children: [
//               {
//                 path: "",
//                 element: <ProjectsTemplates />,
//               },
//               {
//                 path: ":slug", 
//                 element: <ProjectDetailTemplate />,
//               },
//               {
//                 path:"yenilayihələr/:slug",
//                 element:<SpecialProjectsTemplates/>
//               }
//             ],
//           },
//           {
//             path: "ksm",
//             children: [
//               {
//                 path: "",
//                 element: <KsmTemplates />,
//               },
//               {
//                 path: ":slug", 
//                 element: <KsmDetailTemplates />,
//               },
//             ],
//           }
//           ,
//           {
//             path: "services",
//             children: [
//               {
//                 path: "",
//                 element: <ServiceTemplates />,
//               },
//               {
//                 path: ":slug", 
//                 element: <ServiceDetailsTemplates />,
//               },
//               {
//                 path:"offices/:slug",
//                 element:<ServiceOfficeTemplates/>
//               }
//             ],
//           },
//           {
//             path: "career",
//             children: [
//               {
//                 path: "",
//                 element: <CareerTemplates />,
//               },
//               {
//                 path: ":id", 
//                 element: <CareerDetailTemplates />,
//               }
//             ],
//           },
//           {
//             path: "contact",
//             children: [
//               {
//                 path: "",
//                 element: <ContactTemplates />,
//               }
//             ],
//           }
//         ],
//       },
//     ],
//   },
//   {
//     path: "rrgroup/admin",
//     element: <AdminLayout />,
//     children : [
//       {
//         path:'',
//         element:<AdminPage/>
//       },
//       {
//         path:'about',
//         element:<AdminAbout/>
//       },
//       {
//         path:'projects',
//         element:<AdminProjects/>
//       },
//       {
//         path:'ksm',
//         element:<AdminKsm/>
//       },
//       {
//         path:'news',
//         element:<AdminNews/>
//       },
//       {
//         path:'contact',
//         element:<AdminContact/>
//       },
//       {
//         path:'career',
//         element:<AdminCareer/>
//       },
//       {
//         path:'services',
//         element:<AdminService/>
//       }

//     ]
    
//   }
//   // {
//   //   path: "rrgroup/admin",
//   //   element: (
//   //     <ProtectedRoute>
//   //       <AdminLayout />
//   //     </ProtectedRoute>
//   //   ),
//   //   children: [
//   //     { path: "", element: <AdminPage /> },
//   //     { path: "about", element: <AdminAbout /> },
//   //     { path: "projects", element: <AdminProjects /> },
//   //     { path: "ksm", element: <AdminKsm /> },
//   //     { path: "news", element: <AdminNews /> },
//   //     { path: "contact", element: <AdminContact /> },
//   //     { path: "career", element: <AdminCareer /> },
//   //   ],
//   // },
//   // {
//   //   path: "rrgroup/admin/login",
//   //   element: <LoginPage />,
//   // }
  
// ]);

import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout";
import AboutTemplates from "./components/templates/aboutTemplates";
import HomeTemplates from "./components/templates/homeTemplates";
import ProjectsTemplates from "./components/templates/projectsTemplates";
import ProjectDetailTemplate from "./components/templates/projectsDetailTemplate";
import NewsTemplates from "./components/templates/newsTemplates";
import NewsDetailTemplate from "./components/templates/newsDetailTemplates";
import KsmTemplates from "./components/templates/ksmTemplates";
import KsmDetailTemplates from "./components/templates/ksmDetailTemplates";
import ServiceTemplates from "./components/templates/serviceTemplates";
import ServiceDetailsTemplates from "./components/templates/serviceDetailTemplates";
import ServiceOfficeTemplates from "./components/templates/serviceOfficeTemplates";
import CareerTemplates from "./components/templates/careerTemplates";
import CareerDetailTemplates from "./components/templates/careerDetailTemplates";
import ContactTemplates from "./components/templates/contactTemplates";
// import SpecialProjectsTemplates from "./components/templates/specialProjectsTemplates";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminPage from "./pages/admin/AdminPage";
import AdminAbout from "./pages/admin/AdminAbout";
import SwaggerDocs from "./components/templates/SwaggerDocs";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminKsm from "./pages/admin/AdminKsm";
import AdminNews from "./pages/admin/AdminNews";
import AdminContact from "./pages/admin/AdminContact";
import AdminCareer from "./pages/admin/AdminCareer";
import AdminService from "./pages/admin/AdminService";
import SpecialProjectsTemplates from "./components/templates/specialProjectsTemplates";
import PrivateRoute from "./pages/admin/component/ProtectedRoute";
import Login from "./pages/admin/context/AdminLoginPage";
import ForgetPassword from "./pages/admin/context/ForgetPassword";
import ResetPassword from "./pages/admin/context/ResetPassword";
import Register from "./pages/admin/context/AdminRegister";
import ForgotPasswordOTP from "./pages/admin/context/ForgetPasswordOtp";
import ForgotPasswordEmail from "./pages/admin/context/ForgetPasswordEmail";
import AdminProfile from "./pages/admin/context/AdminProfile";
import AdminResetPassword from "./pages/admin/context/ResetPassword";
import ResetEmailPage from "./pages/admin/context/AdminResetEmail";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
        children: [
          {
            path: "docs",
            element: <SwaggerDocs />,
          },          
          {
            path: "about", 
            element: <AboutTemplates />,
          },
          {
            path: "", 
            element: <HomeTemplates />,
          },
          {
            path: "news",
            children: [
              {
                path: "",
                element: <NewsTemplates />,
              },
              {
                path: ":slug", 
                element: <NewsDetailTemplate />,
              },
            ],
          },
          {
            path: "projects",
            children: [
              {
                path: "",
                element: <ProjectsTemplates />,
              },
              {
                path: ":slug", 
                element: <ProjectDetailTemplate />,
              },
              {
                path:"newprojects/:slug",
                element:<SpecialProjectsTemplates/>
              }
            ],
          },
          {
            path: "ksm",
            children: [
              {
                path: "",
                element: <KsmTemplates />,
              },
              {
                path: ":slug", 
                element: <KsmDetailTemplates />,
              },
            ],
          }
          ,
          {
            path: "services",
            children: [
              {
                path: "",
                element: <ServiceTemplates />,
              },
              {
                path: ":slug", 
                element: <ServiceDetailsTemplates />,
              },
              {
                path:"offices/:slug",
                element:<ServiceOfficeTemplates/>
              }
            ],
          },
          {
            path: "career",
            children: [
              {
                path: "",
                element: <CareerTemplates />,
              },
              {
                path: ":slug", 
                element: <CareerDetailTemplates />,
              }
            ],
          },
          {
            path: "contact",
            children: [
              {
                path: "",
                element: <ContactTemplates />,
              }
            ],
          }
        ],
      
  },
  // {
  //   path: "/admin",
  //   element: <AdminLayout />,
  //   children : [
  //     {
  //       path:'',
  //       element:<AdminPage/>
  //     },
  //     {
  //       path:'about',
  //       element:<AdminAbout/>
  //     },
  //     {
  //       path:'projects',
  //       element:<AdminProjects/>
  //     },
  //     {
  //       path:'ksm',
  //       element:<AdminKsm/>
  //     },
  //     {
  //       path:'news',
  //       element:<AdminNews/>
  //     },
  //     {
  //       path:'contact',
  //       element:<AdminContact/>
  //     },
  //     {
  //       path:'career',
  //       element:<AdminCareer/>
  //     },
  //     {
  //       path:'services',
  //       element:<AdminService/>
  //     }

  //   ]
    
  // }
  {
    path: "/admin",
    element: (
      <PrivateRoute>
        <AdminLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "", element: <AdminPage /> },
      { path: "about", element: <AdminAbout /> },
      { path: "projects", element: <AdminProjects /> },
      { path: "ksm", element: <AdminKsm /> },
      { path: "news", element: <AdminNews /> },
      { path: "contact", element: <AdminContact /> },
      { path: "career", element: <AdminCareer /> },
      { path: "services", element: <AdminService /> },
      {
        path: "profile",
        element: <AdminProfile />,
      },
      {
        path: "reset-password",
        element: <AdminResetPassword />,
      },
      {
        path: "reset-email",
        element: <ResetEmailPage />,
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forget-password/email",
    element: <ForgotPasswordEmail />,       
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />,       
  },
  {
    path: "/forget-password/otp",
    element: <ForgotPasswordOTP />,    
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,        
  },
  {
    path: "/register",
    element: <Register />,
  },

  
  // {
  //   path: "/admin",
  //   children: [
  //     {
  //       path: "login",
  //       element: <Login />
  //     },
  //     {
  //       path: "forget-password",
  //       element: <ForgetPassword />
  //     },
  //     {
  //       path: "reset-password",
  //       element: <ResetPassword />
  //     },
  //     {
  //       path: "",
  //       element: (
  //         <PrivateRoute>
  //           <AdminLayout />
  //         </PrivateRoute>
  //       ),
  //       children: [
  //         {
  //           path: "",
  //           element: <AdminPage />,
  //         },
  //         {
  //           path: "about",
  //           element: <AdminAbout />,
  //         },
  //         {
  //           path: "projects",
  //           element: <AdminProjects />,
  //         },
  //         {
  //           path: "ksm",
  //           element: <AdminKsm />,
  //         },
  //         {
  //           path: "news",
  //           element: <AdminNews />,
  //         },
  //         {
  //           path: "contact",
  //           element: <AdminContact />,
  //         },
  //         {
  //           path: "career",
  //           element: <AdminCareer />,
  //         },
  //         {
  //           path: "services",
  //           element: <AdminService />,
  //         }
  //       ]
  //     }
  //   ]
  // }
  
  
]);



