import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaBars, FaSearch, FaShoppingBag, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const [tokens, setTokens] = useState();
    const [open, setOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [totalCartCount, setTotalCartCount] = useState(0);

    // 🔍 suggestions
    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    const navigate = useNavigate();

    const logoutButton = () => {
        localStorage.removeItem("token");
        setTokens(null);
        navigate("/ecommerce");
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        setTokens(token);
        if (token) {
            axios
                .get("https://ecommercebackend-1-fwcd.onrender.com/api/cart", {
                    headers: { Authorization: token },
                })
                .then((res) => {
                    setTotalCartCount(res.data.length || 0);
                })
                .catch((err) => {
                    console.error("Failed to fetch cart count:", err);
                });
        }
    }, []);

    //  main search navigation (press Enter / click icon)
    const doSearch = () => {
        const q = searchTerm.trim();
        if (q) {
            navigate(`/ecommerce?search=${encodeURIComponent(q)}`);
        } else {
            navigate("/ecommerce");
        }
        setShowDropdown(false);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        doSearch();
    };

    const handleUserVm = (itemId) => {

        console.log(itemId)
        //   handleAddCart(selectedItem)
        navigate("/ecommerce/home/viewmore", { state: itemId });

    }
    // 🔍 Fetch suggestions as user types (debounced)
    useEffect(() => {
        const q = searchTerm.trim();
        if (!q) {
            setSuggestions([]);
            setShowDropdown(false);
            return;
        }

        setIsSearching(true);

        const controller = new AbortController();
        const timeoutId = setTimeout(async () => {
            try {
                const res = await axios.get(
                    "https://ecommercebackend-1-fwcd.onrender.com/api/products",
                    {
                        params: {
                            search: q,
                            limit: 5, // small list for dropdown
                        },
                        signal: controller.signal,
                    }
                );

                const data = res.data;
                const products = Array.isArray(data)
                    ? data
                    : Array.isArray(data.products)
                        ? data.products
                        : [];

                setSuggestions(products);
                setShowDropdown(true);
            } catch (err) {
                if (err.name !== "CanceledError" && err.code !== "ERR_CANCELED") {
                    console.error("Search suggestions error:", err);
                }
            } finally {
                setIsSearching(false);
            }
        }, 300); // 300ms debounce

        return () => {
            controller.abort();
            clearTimeout(timeoutId);
        };
    }, [searchTerm]);



    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div
                        onClick={() => navigate("/ecommerce/home")}
                        className="flex items-center space-x-2 cursor-pointer"
                    >
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">S</span>
                        </div>
                        <span className="text-2xl font-bold text-gray-900">
                            Shop<span className="text-blue-600">Lux</span>
                        </span>
                    </div>

                    {/* Navigation (empty now) */}
                    <nav className="hidden md:flex items-center space-x-8"></nav>

                    {/* Search (Desktop) */}
                    <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
                        <div className="relative w-full">
                            {/* wrap in form so Enter works */}
                            <form onSubmit={handleSearchSubmit}>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        className="w-full text-black placeholder-gray-400 pl-10 pr-4 py-2 border border-gray-300 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                        }}
                                        onFocus={() => {
                                            if (suggestions.length > 0) setShowDropdown(true);
                                        }}
                                    />
                                    <button
                                        type="button"
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                        onClick={doSearch}
                                    >
                                        <FaSearch />
                                    </button>
                                </div>
                            </form>

                            {/* 🔽 Suggestions dropdown */}
                            {showDropdown && suggestions.length > 0 && (
                                <div className="absolute mt-1 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-72 overflow-y-auto">
                                    {isSearching && (
                                        <div className="px-3 py-2 text-xs text-gray-500">
                                            Searching...
                                        </div>
                                    )}
                                    {suggestions.map((p) => (
                                        <button

                                            key={p.id}
                                            type="button"
                                            className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-50"
                                            onMouseDown={(e) => {
                                                e.preventDefault();
                                                handleUserVm(p)
                                                // handleSuggestionClick(p);
                                            }}
                                        >

                                            <div className="w-10 h-10 flex-shrink-0 rounded-md bg-gray-100 overflow-hidden">
                                                {p.image_url ? (
                                                    <img
                                                        src={p.image_url}
                                                        alt={p.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                                                        No img
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-sm font-medium text-gray-800 truncate">
                                                    {p.name}
                                                </div>
                                                <div className="text-xs text-gray-500 truncate">
                                                    {p.description}
                                                </div>
                                            </div>
                                            <div className="text-sm font-semibold text-gray-900">
                                                ₹{p.price}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Icons */}
                    <div className="flex items-center space-x-4">
                        {/* Cart */}
                        {tokens ? (
                            <>
                                <button
                                    onClick={() => navigate("/ecommerce/ecommerce/home/cart")}
                                    className="text-gray-600 hover:text-blue-600 transition relative"
                                >
                                    <FaShoppingBag className="text-xl" />
                                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                        {totalCartCount}
                                    </span>
                                </button>

                            </>
                        ) : (<></>)}

                        {/* User dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setOpen(!open)}
                                className="text-gray-600 hover:text-blue-600 transition"
                            >
                                <FaUser className="text-xl" />
                            </button>

                            {tokens ? (
                                open && (
                                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                                        <ul className="py-2 text-sm text-gray-700">
                                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                                Profile
                                            </li>
                                            <li
                                                onClick={() =>
                                                    navigate("/ecommerce/home/order-history")
                                                }
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            >
                                                OrderHistory
                                            </li>
                                            <li
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                onClick={logoutButton}
                                            >
                                                Logout
                                            </li>
                                        </ul>
                                    </div>
                                )
                            ) : (
                                open && (
                                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                                        <ul className="py-2 text-sm text-gray-700">
                                            <li
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                onClick={() => navigate("/ecommerce/ecommerce/login")}
                                            >
                                                Login
                                            </li>
                                        </ul>
                                    </div>
                                )
                            )}
                        </div>

                        {/* Mobile menu */}
                        <button
                            className="md:hidden text-gray-600"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <FaBars className="text-xl" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t px-4 py-3 space-y-3">
                    <p
                        onClick={() => navigate("/ecommerce/home")}
                        className="block text-gray-700 font-medium cursor-pointer"
                    >
                        Home
                    </p>
                    <p className="block text-gray-700 font-medium">Profile</p>
                    <p
                        onClick={() => navigate("/ecommerce/home/order-history")}
                        className="block text-gray-700 font-medium cursor-pointer"
                    >
                        OrderHistory
                    </p>
                </div>
            )}
        </header>
    );
};

export default NavBar;
