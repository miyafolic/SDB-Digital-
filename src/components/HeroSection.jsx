import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden bg-background transition-colors duration-300">
      {/* Background gradient effects - different for light and dark modes */}
      <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-slate-900 dark:via-background dark:to-slate-950 bg-gradient-to-br from-slate-50 via-background to-slate-100" />
      
      {/* Decorative circles */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl dark:bg-primary/5" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl dark:bg-secondary/5" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-block">
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                ⚡ Premium Box Cricket Experience
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-black text-balance leading-tight">
                Book Your
                <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Perfect Match
                </span>
              </h1>
              
              <p className="text-lg text-foreground/70 max-w-xl leading-relaxed">
                Experience world-class box cricket facilities with professional coaching, premium equipment, and flexible scheduling. Play with your friends or join organized tournaments.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="group px-8 py-4 bg-primary hover:bg-primary_dark text-white rounded-lg font-bold text-lg transition-all duration-300 flex items-center gap-2 justify-center">
                Book Now
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="px-8 py-4 border-2 border-primary text-primary dark:text-primary rounded-lg font-bold text-lg hover:bg-primary/10 transition-colors flex items-center gap-2 justify-center">
                <Play size={20} className="fill-primary" />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div>
                <p className="text-3xl font-bold text-primary">5000+</p>
                <p className="text-sm text-foreground/60">Happy Players</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">12+</p>
                <p className="text-sm text-foreground/60">Premium Courts</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">24/7</p>
                <p className="text-sm text-foreground/60">Available</p>
              </div>
            </div>
          </div>

          {/* Right Content - Image Placeholder with animation */}
          <div className="relative h-96 md:h-full min-h-96">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl dark:from-primary/10 dark:to-secondary/10 animate-pulse" />
            
            <div className="absolute inset-4 bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl dark:from-accent/10 dark:to-primary/10 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="text-7xl">🏏</div>
                <p className="text-foreground/60 font-semibold">Box Cricket Arena</p>
                <p className="text-sm text-foreground/50">Premium Cricket Facility</p>
              </div>
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-8 -right-8 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-2xl border border-border dark:border-slate-700 max-w-xs backdrop-blur-lg bg-white/80 dark:bg-slate-800/80">
              <p className="text-sm font-semibold text-foreground/70">Next Available Slot</p>
              <p className="text-2xl font-bold text-primary mt-2">Today at 5:00 PM</p>
              <p className="text-sm text-foreground/60 mt-2">Court A • 2 hours available</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
