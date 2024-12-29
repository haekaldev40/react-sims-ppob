import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/logo.png";

function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 ">
      <div>
        <Link to={"/"} className="flex gap-2">
          <img src={Logo} alt="Logo" className="w-5 h-5" />
          <span className="font-semibold text-sm">SIMS PPOB</span>
        </Link>
      </div>
      <div className="mr-8">
        <ul className="flex items-center gap-10 font-semibold text-[13px]">
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "text-[#dc2626]" : "")}
              to="/topup"
              end
            >
              Topup
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "text-[#dc2626]" : "")}
              to="/transaction"
            >
              Transaction
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "text-[#dc2626]" : "")}
              to="/profile"
              end
            >
              Akun
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
