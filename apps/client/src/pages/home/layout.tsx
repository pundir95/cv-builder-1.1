import { ScrollArea } from "@reactive-resume/ui";
import {  Outlet } from "react-router";
import { Navigate } from "react-router";

import { Footer } from "./components/footer";
import { Header } from "./components/header";

export const HomeLayout = () => {
return <Outlet />
}

