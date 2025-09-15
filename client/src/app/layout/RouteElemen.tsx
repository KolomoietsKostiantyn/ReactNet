import type {  ReactNode } from "react";
import { NavLink } from "react-router-dom";

export default function RouteElemen({ to, children,  }: { to: string; children: ReactNode })
{
    return(<NavLink to={to} style={({ isActive }) => ({    marginRight: 10,    color: isActive ? "red" : "black"  })}>{children}</NavLink>)
}