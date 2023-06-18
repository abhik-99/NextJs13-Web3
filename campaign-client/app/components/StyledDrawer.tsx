"use client";
import React from "react";
import { useDrawerContext } from "../context/DrawerContext";
import cx from "classnames";

import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseOutline } from "react-icons/io5";
import Link from "next/link";

type StyledDrawerProps = {
  children: React.ReactNode;
};

export const StyledDrawer = ({ children }: StyledDrawerProps) => {
  const { open, toggleDrawer } = useDrawerContext();
  return (
    <div className={cx("drawer relative group", open && "drawer-open")}>
      <input type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {children}
      </div>
      <div className="drawer-side bg-base-200">
        <>
          <div className="pl-2 w-full flex justify-end items-center">
            <button
              onClick={() => toggleDrawer()}
              className="m-4 p-1 text-lg  border border-gray-400 rounded-full"
            >
              <IoCloseOutline />
            </button>
          </div>
          <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/campaigns">Campaigns</Link>
            </li>
          </ul>
        </>
      </div>
    </div>
  );
};

export const DrawerToggleButton = () => {
  const { toggleDrawer } = useDrawerContext();
  return (
    <button
      onClick={() => toggleDrawer()}
      className="p-1 border border-gray-400 rounded-lg"
    >
      <GiHamburgerMenu />
    </button>
  );
};
