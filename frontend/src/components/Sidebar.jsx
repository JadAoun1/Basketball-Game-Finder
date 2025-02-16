import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";
import {
    HomeIcon,
    FolderIcon,
    DocumentDuplicateIcon,
    UsersIcon,
    ChartPieIcon,
    Cog6ToothIcon,
    ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import { AuthContext } from "../context/AuthContext";

// Navigation for unauthenticated users
const publicNavigation = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "Sign Up", href: "/signup", icon: DocumentDuplicateIcon },
    { name: "Login", href: "/login", icon: UsersIcon },
];

// Navigation for authenticated users
const privateNavigation = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "Games", href: "/games", icon: FolderIcon },
    { name: "Create Game", href: "/create-game", icon: DocumentDuplicateIcon },
    { name: "Profile", href: "/profile", icon: UsersIcon },
    { name: "My Games", href: "/my-games", icon: ChartPieIcon },
    { name: "Settings", href: "/settings", icon: Cog6ToothIcon },
    { name: "Messages", href: "/messages", icon: ChatBubbleLeftEllipsisIcon },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Sidebar() {
    const { user, logout } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(true);
    const navigation = user ? privateNavigation : publicNavigation;

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    if (!isOpen) {
        return (
            <div className="fixed top-0 left-0 h-screen w-16 bg-white border-r border-gray-200 flex items-center justify-center">
                <button onClick={toggleSidebar} className="p-2 focus:outline-none">
                    <Bars3Icon className="h-6 w-6 text-gray-700" />
                </button>
            </div>
        );
    }

    return (
        <div className="fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <img
                    alt="Your Company"
                    src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                    className="h-8 w-auto"
                />
                <button onClick={toggleSidebar} className="p-2 focus:outline-none">
                    <XMarkIcon className="h-6 w-6 text-gray-700" />
                </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-6 py-4">
                <ul role="list" className="space-y-2">
                    {navigation.map((item) => (
                        <li key={item.name}>
                            <Link
                                to={item.href}
                                className={classNames(
                                    "group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                                )}
                            >
                                <item.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                <span>{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {user && (
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                    <Link to="/profile" className="flex items-center gap-x-3">
                        <img
                            alt="Your Profile"
                            src={
                                user.profileImage ||
                                "https://www.gravatar.com/avatar/?d=mp&f=y"
                            }
                            className="h-10 w-10 rounded-full"
                        />
                        <div>
                            <p className="text-sm font-medium text-gray-900">
                                {user.username || "Your Name"}
                            </p>
                            <p className="text-xs text-gray-500">View profile</p>
                        </div>
                    </Link>
                    <button
                        onClick={logout}
                        className="ml-2 rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white hover:bg-indigo-500 focus:outline-none"
                    >
                        Sign Out
                    </button>

                </div>
            )}
        </div>
    );
}
