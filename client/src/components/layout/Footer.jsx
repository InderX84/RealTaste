import { Coffee, MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-amber-900 via-orange-900 to-red-900 text-white relative overflow-hidden">
      <div className="absolute inset-0" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="20" cy="20" r="2"/%3E%3C/g%3E%3C/svg%3E")'}}></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
              <div className="bg-yellow-500 p-1.5 sm:p-2 rounded-full">
                <Coffee className="h-6 w-6 sm:h-8 sm:w-8 text-amber-900" />
              </div>
              <span className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-yellow-100">Real Taste Café</span>
            </div>
            <p className="text-amber-200 mb-4 sm:mb-6 font-serif text-base sm:text-lg leading-relaxed">
              Where every cup tells a story and every visit feels like coming home. ☕❤️
            </p>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-serif font-bold mb-4 sm:mb-6 text-yellow-200 flex items-center">
              <span className="mr-2">📍</span> Visit Us
            </h3>
            <div className="space-y-3 sm:space-y-4 text-amber-200">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mt-1 text-yellow-300 flex-shrink-0" />
                <div className="font-serif text-sm sm:text-base">
                  <p>123 Coffee Street</p>
                  <p>Downtown District</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-300 flex-shrink-0" />
                <span className="font-serif text-sm sm:text-base">(555) 123-CAFE</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-300 flex-shrink-0" />
                <span className="font-serif text-sm sm:text-base break-all">hello@realtastecafe.com</span>
              </div>
            </div>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-serif font-bold mb-4 sm:mb-6 text-yellow-200 flex items-center">
              <span className="mr-2">🕐</span> Open Hours
            </h3>
            <div className="space-y-2 sm:space-y-3 text-amber-200 font-serif">
              <div className="flex items-start space-x-3">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 mt-1 text-yellow-300 flex-shrink-0" />
                <div className="text-sm sm:text-base">
                  <div>Monday - Friday: 6AM - 9PM</div>
                  <div>Saturday: 7AM - 10PM</div>
                  <div>Sunday: 7AM - 8PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-amber-700 mt-8 sm:mt-12 lg:mt-16 pt-6 sm:pt-8 lg:pt-12 text-center">
          <p className="text-amber-200 font-serif text-sm sm:text-base lg:text-lg">
            © 2025 Real Taste. Made with ❤️ for coffee lovers and fast food lovers from everywhere.
          </p>
          <p className="text-amber-300 font-serif text-xs sm:text-sm mt-2">
            Developed by <a href="https://www.instagram.com/inderx84/" target="_blank" rel="noopener noreferrer" className="text-yellow-300 hover:text-yellow-200 underline">@inderx84</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;