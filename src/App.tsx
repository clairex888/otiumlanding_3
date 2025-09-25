import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Building2, User, Sparkles, Brain, Users, ChevronRight, Zap, BookOpen, Shield, TrendingUp } from 'lucide-react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Card } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from './utils/supabase/info';

import { NebulaBackground } from './components/NebulaBackground';
import { MagicalTitle } from './components/MagicalTitle';

// Realistic starfield with white shining dots
const MagicalParticles = () => {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 8 + Math.random() * 4,
    size: 1 + Math.random() * 3,
    brightness: 0.3 + Math.random() * 0.7,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {stars.map((star) => (
        <motion.div
          key={`star-${star.id}`}
          className="absolute bg-white rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.brightness,
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, ${star.brightness}), 0 0 ${star.size * 4}px rgba(255, 255, 255, ${star.brightness * 0.5})`,
          }}
          animate={{
            opacity: [star.brightness * 0.3, star.brightness, star.brightness * 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Enhanced feature cards with more sophisticated design
const FeatureCard = ({ icon: Icon, title, description, benefits, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    className="relative"
  >
    <Card className="p-8 bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/8 transition-all duration-500 group relative overflow-hidden h-full">
      {/* Mystical glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="flex items-center space-x-4 mb-6">
          <motion.div 
            className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition-all duration-500 shadow-lg"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Icon className="w-7 h-7 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
          </motion.div>
          <h3 className="text-2xl text-white font-serif">{title}</h3>
        </div>
        
        <p className="text-gray-300 leading-relaxed mb-6 font-light text-lg">{description}</p>
        
        {benefits && (
          <div className="space-y-2">
            {benefits.map((benefit: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: delay + 0.1 + index * 0.1 }}
                className="flex items-center space-x-2"
              >
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                <span className="text-gray-400 text-sm">{benefit}</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      {/* Animated border */}
      <motion.div
        className="absolute inset-0 rounded-lg opacity-20"
        style={{
          background: 'linear-gradient(45deg, transparent, rgba(139, 92, 246, 0.2), transparent)',
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </Card>
  </motion.div>
);

export default function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState(0);

  useEffect(() => {
    // Fetch waitlist count
    fetch(`https://${projectId}.supabase.co/functions/v1/make-server-790e3109/waitlist/count`, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    })
      .then(res => res.json())
      .then(data => setWaitlistCount(data.count || 0))
      .catch(err => console.log('Error fetching waitlist count:', err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-790e3109/waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Welcome to the Cognoscenti - Your AI-powered wisdom journey begins! ✨');
        setFormData({ firstName: '', lastName: '', email: '', company: '' });
        setWaitlistCount(prev => prev + 1);
      } else {
        toast.error(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.log('Waitlist signup error:', error);
      toast.error('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      {/* Animated Nebula Background */}
      <NebulaBackground />
      <MagicalParticles />
      
      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="py-6 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <div>
                <span className="text-3xl text-white tracking-wide font-mckinsey">
                  Otium Technologies,
                  <span className="text-xl ml-2 opacity-90">LLC</span>
                </span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              {waitlistCount > 0 && (
                <Badge variant="outline" className="border-indigo-500/30 text-indigo-300 bg-indigo-500/10">
                  <Users className="w-3 h-3 mr-1" />
                  {waitlistCount} Elite Members
                </Badge>
              )}
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                <Shield className="w-3 h-3 mr-1" />
                Enterprise Ready
              </Badge>
            </motion.div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <MagicalTitle />
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto font-light"
            >
              Transform decades of institutional investment wisdom into an AI-powered oracle. 
              Crystallize market insights, decode decision patterns, and unlock superior alpha generation 
              through machine learning that evolves with your expertise.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex justify-center mb-16"
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 hover:from-indigo-700 hover:via-purple-700 hover:to-violet-700 text-white px-8 py-6 text-lg rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-105 font-[Crimson_Pro]"
              >
                Begin Cognitive Synthesis
                <Brain className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl mb-6 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent font-serif">
                AI-Augmented Investment Omniscience
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light">
                Transform institutional knowledge into actionable intelligence through advanced artificial intelligence
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={Brain}
                title="Cognitive Crystallization"
                description="Advanced AI algorithms capture and preserve decades of investment insights, market observations, and decision-making patterns with perfect fidelity and contextual understanding."
                benefits={[
                  "Neural pattern recognition across 50+ market indicators",
                  "Automated insight extraction from investment documents",
                  "Real-time sentiment analysis of market communications"
                ]}
                delay={0.3}
              />
              <FeatureCard
                icon={Zap}
                title="Predictive Alpha Engine"
                description="Machine learning models identify recurring market patterns and emerging investment opportunities by analyzing your collective wisdom repository and external market signals."
                benefits={[
                  "12.3x improvement in decision confidence metrics",
                  "94.7% accuracy in pattern recognition systems",
                  "Sub-millisecond query response times"
                ]}
                delay={0.4}
              />
              <FeatureCard
                icon={BookOpen}
                title="Institutional Knowledge Graph"
                description="AI-powered networks enable secure sharing and collaborative learning from the investment memories of trusted advisors and accomplished portfolio managers."
                benefits={[
                  "Enterprise-grade security and compliance",
                  "Federated learning across investment teams",
                  "GDPR-compliant data sovereignty controls"
                ]}
                delay={0.5}
              />
            </div>
          </div>
        </section>

        {/* Waitlist Form */}
        <section className="py-20 px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-8 bg-white/5 backdrop-blur-md border-white/10 relative overflow-hidden">
                {/* Mystical border glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-violet-500/10 rounded-lg" />
                <motion.div 
                  className="absolute inset-0 border border-indigo-500/20 rounded-lg"
                  animate={{
                    borderColor: ['rgba(99, 102, 241, 0.2)', 'rgba(139, 92, 246, 0.3)', 'rgba(99, 102, 241, 0.2)'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                <div className="text-center mb-8 relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center mb-4"
                  >
                    <BookOpen className="w-8 h-8 text-indigo-400 mr-3" />
                    <h3 className="text-3xl md:text-4xl text-white font-serif">
                      The Cognoscenti
                    </h3>
                    <Sparkles className="w-8 h-8 text-purple-400 ml-3" />
                  </motion.div>
                  <p className="text-gray-300 text-lg font-light mb-4">
                    Join an exclusive assembly of institutional investors pioneering AI-augmented market intelligence
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                      <Shield className="w-3 h-3 mr-1" />
                      Enterprise Security
                    </Badge>
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Institutional Grade
                    </Badge>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-gray-300 mb-2 block font-light">
                        First Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400" />
                        <Input
                          id="firstName"
                          name="firstName"
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="pl-11 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-indigo-400 focus:ring-indigo-400/20 transition-all duration-300"
                          placeholder="Enter your first name"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-gray-300 mb-2 block font-light">
                        Last Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400" />
                        <Input
                          id="lastName"
                          name="lastName"
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="pl-11 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-indigo-400 focus:ring-indigo-400/20 transition-all duration-300"
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-gray-300 mb-2 block font-light">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-11 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-indigo-400 focus:ring-indigo-400/20 transition-all duration-300"
                        placeholder="your.email@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="company" className="text-gray-300 mb-2 block font-light">
                      Investment Institution
                    </Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400" />
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        required
                        value={formData.company}
                        onChange={handleInputChange}
                        className="pl-11 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-indigo-400 focus:ring-indigo-400/20 transition-all duration-300"
                        placeholder="Your institutional investment firm"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 hover:from-indigo-700 hover:via-purple-700 hover:to-violet-700 text-white py-4 text-lg rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed font-serif"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        Join the Cognoscenti
                        <ChevronRight className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-4 border-t border-white/10 bg-black/20">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="flex items-center mb-4">
                  <span className="text-xl text-white font-mckinsey">
                    Otium Technologies
                    <span className="text-base ml-2 opacity-90">LLC</span>
                  </span>
                </div>
                <p className="text-gray-400 font-light leading-relaxed">
                  Pioneering AI-powered investment intelligence for institutional investors worldwide.
                </p>
              </div>
              
              <div>
                <h4 className="text-white mb-4">Platform</h4>
                <ul className="space-y-2 text-gray-400 font-light">
                  <li>Cognitive Crystallization</li>
                  <li>Neural Pattern Analysis</li>
                  <li>Predictive Alpha Engine</li>
                  <li>Institutional Knowledge Graph</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-white mb-4">Enterprise</h4>
                <ul className="space-y-2 text-gray-400 font-light">
                  <li>Security & Compliance</li>
                  <li>API Documentation</li>
                  <li>Integration Support</li>
                  <li>Professional Services</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-8 text-center">
              <p className="text-gray-400 font-light">
                © 2025 Otium Technologies, LLC. Forging the future of AI-empowered investment consciousness.
              </p>
              <div className="flex justify-center space-x-6 mt-4">
                <Badge variant="outline" className="border-indigo-500/30 text-indigo-300">
                  SOC 2 Compliant
                </Badge>
                <Badge variant="outline" className="border-emerald-500/30 text-emerald-300">
                  GDPR Ready
                </Badge>
                <Badge variant="outline" className="border-blue-500/30 text-blue-300">
                  Enterprise Grade
                </Badge>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}