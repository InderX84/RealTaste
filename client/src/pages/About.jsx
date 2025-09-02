import { Coffee, Heart, Users, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="page-container bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-800 via-orange-800 to-red-800 text-white section-spacing relative overflow-hidden">
        <div className="absolute inset-0" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="3"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}></div>
        <div className="relative container mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <div className="mb-6">
            <Heart className="h-16 w-16 text-yellow-300 mx-auto mb-4" />
          </div>
          <h1 className="text-5xl font-serif font-bold mb-6 text-yellow-100">Our Story</h1>
          <p className="text-xl text-amber-200 max-w-2xl mx-auto">Where passion meets perfection, one cup at a time ☕❤️</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-spacing">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl card-spacing border-2 border-amber-200">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif font-bold text-amber-900 mb-6">The Real Taste Journey</h2>
              <div className="text-6xl mb-6">📖</div>
            </div>
            
            <div className="prose prose-lg max-w-none text-amber-800 font-serif leading-relaxed">
              <p className="text-xl mb-6">
                Founded in 2020 with a simple dream: to create a warm, welcoming space where every cup tells a story 
                and every visit feels like coming home.
              </p>
              
              <p className="mb-6">
                Our journey began when our founder, inspired by travels through coffee farms around the world, 
                decided to bring those authentic flavors and that sense of community to our neighborhood. 
                What started as a small corner cafe has grown into a beloved gathering place for coffee lovers, 
                remote workers, students, and friends.
              </p>
              
              <p className="mb-6">
                We believe that great coffee is more than just a beverage – it's a catalyst for connection, 
                creativity, and community. Every bean is carefully sourced from sustainable farms, every recipe 
                is crafted with love, and every customer is treated like family.
              </p>
              
              <p>
                Today, Real Taste Café stands as a testament to the power of following your passion and 
                the magic that happens when quality meets community. We're not just serving coffee; 
                we're brewing relationships, one cup at a time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-spacing bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-amber-900 mb-6">What We Stand For</h2>
            <p className="text-xl text-amber-800 max-w-2xl mx-auto">The values that guide everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: Coffee, 
                title: "Quality First", 
                desc: "Premium beans, expert roasting, perfect brewing",
                emoji: "☕"
              },
              { 
                icon: Heart, 
                title: "Made with Love", 
                desc: "Every drink crafted with passion and care",
                emoji: "❤️"
              },
              { 
                icon: Users, 
                title: "Community Focus", 
                desc: "Building connections one conversation at a time",
                emoji: "👥"
              },
              { 
                icon: Award, 
                title: "Sustainable Choice", 
                desc: "Ethically sourced, environmentally conscious",
                emoji: "🌱"
              }
            ].map((value, index) => (
              <div key={index} className="text-center card-spacing bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-amber-200">
                <div className="text-5xl mb-4">{value.emoji}</div>
                <h3 className="text-xl font-serif font-bold text-amber-900 mb-4">{value.title}</h3>
                <p className="text-amber-700 leading-relaxed font-serif">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-spacing">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-amber-900 mb-6">Meet Our Team</h2>
            <p className="text-xl text-amber-800 max-w-2xl mx-auto">The passionate people behind your perfect cup</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Johnson", role: "Founder & Head Barista", emoji: "👩‍💼" },
              { name: "Mike Chen", role: "Coffee Roaster", emoji: "👨‍🍳" },
              { name: "Emma Davis", role: "Community Manager", emoji: "👩‍💻" }
            ].map((member, index) => (
              <div key={index} className="text-center card-spacing bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border-2 border-amber-200">
                <div className="text-6xl mb-4">{member.emoji}</div>
                <h3 className="text-xl font-serif font-bold text-amber-900 mb-2">{member.name}</h3>
                <p className="text-amber-700 font-serif">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-gradient-to-r from-amber-800 via-orange-800 to-red-800 relative overflow-hidden">
        <div className="absolute inset-0" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z"/%3E%3C/g%3E%3C/svg%3E")'}}></div>
        <div className="relative max-w-4xl mx-auto text-center px-6 sm:px-8 lg:px-12">
          <h2 className="text-4xl font-serif font-bold text-yellow-100 mb-6">Join Our Story</h2>
          <p className="text-xl text-amber-200 mb-10 max-w-3xl mx-auto leading-relaxed">
            Become part of our coffee-loving community. Every visit adds a new chapter to our shared story.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/menu" 
              className="bg-yellow-500 text-amber-900 px-8 py-4 rounded-full text-lg font-serif font-bold hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              🍰 Try Our Menu
            </a>
            <a 
              href="/contact" 
              className="border-2 border-yellow-400 text-yellow-100 px-8 py-4 rounded-full text-lg font-serif font-bold hover:bg-yellow-400 hover:text-amber-900 transition-all duration-300 transform hover:scale-105"
            >
              📍 Visit Us Today
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;