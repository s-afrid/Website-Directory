import { useForm } from 'react-hook-form';
import { Mail, X } from 'lucide-react';
import { useState } from 'react';
import footerLogo from "../assets/footerLogo.png";

export default function Footer() {
  const [showMessage, setShowMessage] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      email: ''
    }
  });

  const onSubmit = (data) => {
    console.log('Newsletter signup:', data);
    reset();
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  return (
    <footer className="bg-white border-t border-gray-200 mt-4">
      <div className="w-full px-4 sm:px-6 lg:px-8 rubik">
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Logo Section */}
            <div className="col-span-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">INSPIRO</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Discover curated SaaS website examples to inspire your next design project.
              </p>
              <div className="flex gap-4 mt-4">
                <a href="#" className="text-gray-600 hover:text-gray-900 transition">
                  <X size={20} />
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Explore Links */}
            <div className="col-span-1">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Explore</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 text-sm hover:text-gray-900 transition">Sponsor</a></li>
                <li><a href="#" className="text-gray-600 text-sm hover:text-gray-900 transition">About</a></li>
              </ul>
            </div>

            {/* Policy Links */}
            <div className="col-span-1">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Privacy & Policy</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 text-sm hover:text-gray-900 transition">Terms & Conditions</a></li>
                <li><a href="#" className="text-gray-600 text-sm hover:text-gray-900 transition">Contact Us</a></li>
              </ul>
            </div>

            {/* Newsletter Section */}
            <div className="col-span-1">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Join Our Newsletter</h3>
              
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-3 w-full
                           md:flex-row md:items-center md:justify-center md:bg-white/50 md:rounded-full md:p-2 md:border md:border-gray-200/50"
              >
                <input
                  type="email"
                  placeholder="Enter your work email"
                  {...register("email", {
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email format",
                    },
                  })}
                  className="bg-white/50 backdrop-blur-sm px-4 py-3 rounded-full w-full text-gray-900 placeholder:text-gray-700 outline-none border border-gray-300 focus:ring-2 transition
                             md:flex-1 md:bg-transparent md:backdrop-blur-none md:border-none md:rounded-none md:p-2 md:focus:ring-0 md:px-4"
                />

                <button
                  type="submit"
                  className="bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition w-fit self-center
                             md:w-auto md:py-2"
                >
                  Subscribe
                </button>
              </form>

              {/* Error or Success Message */}
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
              )}
              {showMessage && (
                <p className="text-green-600 font-semibold mt-2">
                  🎉 You are subscribed!
                </p>
              )}

            </div>
          </div>

          {/* Logo Image Section */}
          <div className="border-t border-gray-200 pt-8">
            <img
              src={footerLogo}
              alt="INSPIRO"
              className="w-full max-w-4xl mx-auto h-auto"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
