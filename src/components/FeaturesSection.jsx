import React from 'react';
import { Trophy, Users, Clock, MapPin, Zap, Shield } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: Trophy,
      title: 'World-Class Courts',
      description: 'Professional-grade cricket pitches with international standards and premium equipment.'
    },
    {
      icon: Users,
      title: 'Expert Coaching',
      description: 'Train with experienced coaches certified in cricket development and sports science.'
    },
    {
      icon: Clock,
      title: 'Flexible Timing',
      description: 'Book slots from 6 AM to 11 PM. Perfect for early birds and night owls.'
    },
    {
      icon: MapPin,
      title: 'Multiple Locations',
      description: 'Choose from 12+ premium facilities across the city for your convenience.'
    },
    {
      icon: Zap,
      title: 'Instant Booking',
      description: 'Reserve your slot in seconds with our real-time availability system.'
    },
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Professional-grade safety equipment and trained personnel on every court.'
    }
  ];

  return (
    <section id="features" className="py-20 md:py-32 bg-muted dark:bg-slate-900/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-balance">
            Why Choose
            <span className="block text-primary">Box Cricket Academy?</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            We provide everything you need for an unforgettable cricket experience
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={idx}
                className="group p-8 bg-background rounded-2xl border border-border hover:border-primary dark:hover:border-primary transition-all duration-300 hover:shadow-lg dark:hover:shadow-primary/20 dark:bg-slate-800 dark:border-slate-700"
              >
                <div className="w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 mb-4">
                  <IconComponent size={24} className="text-primary group-hover:text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-foreground/60 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <button className="px-8 py-4 bg-primary hover:bg-primary_dark text-white rounded-lg font-bold text-lg transition-all duration-300">
            Explore All Features
          </button>
        </div>
      </div>
    </section>
  );
}
