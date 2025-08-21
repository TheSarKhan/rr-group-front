// import React from 'react'
// import Layout from './layout'
// import AboutTemplates from './components/templates/aboutTemplates'

// const App = () => {
//   return (
//     <Layout>
//       <AboutTemplates/>
//     </Layout>
//   )
// }

// export default App
import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routers";

const App = () => {

  return (
    <>
      {/* <GoogleTranslate />
      <HideGoogleTranslateBanner/> */}
      <RouterProvider router={router} />
    </>
  );
};

export default App;
