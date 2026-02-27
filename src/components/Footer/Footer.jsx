import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo Section */}
          <div>
            <Logo width={140} />
            <p className="mt-4 text-sm text-gray-500">
              A modern platform to share your ideas with the world.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li><Link className="hover:text-white transition" to="/">Features</Link></li>
              <li><Link className="hover:text-white transition" to="/">Pricing</Link></li>
              <li><Link className="hover:text-white transition" to="/">Affiliate Program</Link></li>
              <li><Link className="hover:text-white transition" to="/">Press Kit</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              <li><Link className="hover:text-white transition" to="/">Account</Link></li>
              <li><Link className="hover:text-white transition" to="/">Help</Link></li>
              <li><Link className="hover:text-white transition" to="/">Contact Us</Link></li>
              <li><Link className="hover:text-white transition" to="/">Customer Support</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              <li><Link className="hover:text-white transition" to="/">Terms & Conditions</Link></li>
              <li><Link className="hover:text-white transition" to="/">Privacy Policy</Link></li>
              <li><Link className="hover:text-white transition" to="/">Licensing</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} BlogSphere. All rights reserved.
        </div>

      </div>
    </footer>
  )
}

export default Footer
