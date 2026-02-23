import React from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa"; 
import footerImage from "../../assets/footer.webp"; 

const Footer = () => {
  return (
    <footer
      className="relative text-white mt-10 bg-cover bg-center"
      style={{ backgroundImage: `url(${footerImage})` }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Footer content */}
      <div className="relative container mx-auto py-12 px-6 grid md:grid-cols-3 gap-6">
        {/* Logo + About */}
        <div>
          <h2 className="text-2xl font-bold mb-2 text-yellow-400">Stay Hotel</h2>
          <p className="text-gray-300 text-sm">
            Experience luxury and comfort with us. Your perfect stay, every time.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="/" className="hover:text-yellow-400 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/room" className="hover:text-yellow-400 transition">
                Room
              </a>
            </li>
            <li>
              <a href="/staff" className="hover:text-yellow-400 transition">
                Staff
              </a>
            </li>
            <li>
              <a href="/booking" className="hover:text-yellow-400 transition">
                Booking
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-yellow-400 transition">
                About
              </a>
            </li>
          </ul>
        </div>

        {/* Contact + Social Icons */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
          <p className="text-gray-300 text-sm">123 Luxury St, Paradise City, Country</p>
          <p className="text-gray-300 text-sm">Phone: +123 456 7890</p>
          <p className="text-gray-300 text-sm">Email: info@stay.com</p>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-3 text-lg">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="text-gray-300 hover:text-yellow-400 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-gray-300 hover:text-yellow-400 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noreferrer"
              className="text-gray-300 hover:text-yellow-400 transition"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="relative text-center py-3 text-gray-400 text-sm border-t border-gray-700 bg-black/80">
        &copy; {new Date().getFullYear()} Stay Hotel. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
