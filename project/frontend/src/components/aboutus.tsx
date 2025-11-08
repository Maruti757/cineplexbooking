import { Star, Users, Film, Award, Globe, Clock, MapPin } from "lucide-react";

export default function AboutUs() {
  const features = [
    {
      icon: Film,
      title: "Premium Experience",
      description:
        "State-of-the-art theaters with 4K projection and Dolby Atmos sound",
    },
    {
      icon: Users,
      title: "Community Focused",
      description:
        "Bringing people together through the magic of cinema since 2010",
    },
    {
      icon: Award,
      title: "Award Winning",
      description:
        "Recognized as the best cinema chain for 3 consecutive years",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description:
        "Over 50 locations nationwide serving millions of movie lovers",
    },
  ];

  const stats = [
    { number: "1M+", label: "Happy Customers" },
    { number: "50+", label: "Locations" },
    { number: "10K+", label: "Movies Screened" },
    { number: "24/7", label: "Customer Support" },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      description: "Passionate about bringing cinematic experiences to life",
    },
    {
      name: "Mike Chen",
      role: "Head of Operations",
      description: "Ensuring seamless movie experiences across all locations",
    },
    {
      name: "Emily Davis",
      role: "Customer Experience",
      description: "Dedicated to making every visit memorable",
    },
  ];

  return (
    <div className="min-h-screen py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-6xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-6">
          About Cineplex
        </h1>
        <p className="text-blue-200/70 text-xl max-w-3xl mx-auto leading-relaxed">
          Where every movie becomes an unforgettable experience. We're
          passionate about bringing the magic of cinema to life with
          cutting-edge technology and unparalleled service.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
        {stats.map((stat, index) => (
          <div key={index} className="text-center group">
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10 transform group-hover:scale-105 transition-all duration-500">
              <div className="text-4xl font-black text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-blue-200/70 font-semibold">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {features.map((feature, index) => (
          <div key={index} className="group">
            <div className="bg-gradient-to-br from-slate-900/50 to-purple-900/30 backdrop-blur-xl rounded-2xl p-8 border border-white/10 h-full transform group-hover:scale-105 transition-all duration-500">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-blue-200/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Story Section */}
      <div className="bg-gradient-to-br from-slate-900/50 to-blue-900/30 backdrop-blur-xl rounded-3xl p-12 border border-white/10 mb-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Star className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-6">Our Story</h2>
          <p className="text-blue-200/70 text-lg leading-relaxed mb-6">
            Founded in 2010, Cineplex started as a single-screen theater with a
            simple mission: to create the ultimate movie-going experience.
            Today, we've grown into one of the nation's leading cinema chains,
            but our commitment to quality and customer satisfaction remains
            unchanged.
          </p>
          <p className="text-blue-200/70 text-lg leading-relaxed">
            We believe that watching a movie should be more than just
            entertainment—it should be an escape, an adventure, and a memory
            that lasts long after the credits roll.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div key={index} className="group text-center">
              <div className="bg-gradient-to-br from-slate-900/50 to-purple-900/30 backdrop-blur-xl rounded-2xl p-8 border border-white/10 transform group-hover:scale-105 transition-all duration-500">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-400 font-semibold mb-3">
                  {member.role}
                </p>
                <p className="text-blue-200/70">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center group">
          <div className="bg-gradient-to-br from-slate-900/50 to-blue-900/30 backdrop-blur-xl rounded-2xl p-8 border border-white/10 transform group-hover:scale-105 transition-all duration-500">
            <MapPin className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">Visit Us</h3>
            <p className="text-blue-200/70">123 Cinema Street</p>
            <p className="text-blue-200/70">Movie City, MC 12345</p>
          </div>
        </div>

        <div className="text-center group">
          <div className="bg-gradient-to-br from-slate-900/50 to-purple-900/30 backdrop-blur-xl rounded-2xl p-8 border border-white/10 transform group-hover:scale-105 transition-all duration-500">
            <Clock className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">Opening Hours</h3>
            <p className="text-blue-200/70">Mon-Sun: 10AM - 2AM</p>
            <p className="text-blue-200/70">Holidays: 12PM - 12AM</p>
          </div>
        </div>

        <div className="text-center group">
          <div className="bg-gradient-to-br from-slate-900/50 to-pink-900/30 backdrop-blur-xl rounded-2xl p-8 border border-white/10 transform group-hover:scale-105 transition-all duration-500">
            <Star className="w-12 h-12 text-pink-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">Our Mission</h3>
            <p className="text-blue-200/70">
              Creating unforgettable cinematic experiences that bring people
              together
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
