import { Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from '../layouts';
import type { ComponentType } from "react";


const Loadable = <P extends object>(Component: ComponentType<P>) => {
    return (props: P) => (
        <Suspense fallback={<div>Loading...</div>}>
            <Component {...props} />
        </Suspense>
    );
};

//
const Home = Loadable(lazy(() => import("../pages/Home")));
const About = Loadable(lazy(() => import("../pages/About")));
const Shop = Loadable(lazy(() => import("../pages/Shop")));
//

export default function Router() {
    return useRoutes([
        {
            path: '',
            element: <DashboardLayout />,
            children: [
                { index: true, element: <Home /> },
                { path: "about", element: <About /> },
                { path: "shop", element: <Shop /> },
            ],
        },
    ]);
}

