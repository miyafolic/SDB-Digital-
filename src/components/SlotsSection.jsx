import React, { useState } from 'react';
import { ChevronDown, Calendar, DollarSign } from 'lucide-react';

export default function SlotsSection() {
  const [selectedCourt, setSelectedCourt] = useState('courtA');
  const [selectedDate, setSelectedDate] = useState('today');

  const courts = [
    { id: 'courtA', name: 'Court A', location: 'Downtown', status: 'Available' },
    { id: 'courtB', name: 'Court B', location: 'Uptown', status: 'Available' },
    { id: 'courtC', name: 'Court C', location: 'Westside', status: 'Busy' },
    { id: 'courtD', name: 'Court D', location: 'Downtown', status: 'Available' },
  ];

  const timeSlots = [
    { time: '6:00 AM - 7:00 AM', available: true, price: '$25' },
    { time: '7:00 AM - 8:00 AM', available: true, price: '$25' },
    { time: '8:00 AM - 9:00 AM', available: false, price: '$25' },
    { time: '12:00 PM - 1:00 PM', available: true, price: '$30' },
    { time: '1:00 PM - 2:00 PM', available: true, price: '$30' },
    { time: '5:00 PM - 6:00 PM', available: true, price: '$35' },
    { time: '6:00 PM - 7:00 PM', available: false, price: '$35' },
    { time: '7:00 PM - 8:00 PM', available: true, price: '$35' },
    { time: '9:00 PM - 10:00 PM', available: true, price: '$25' },
  ];

  return (
    <section id="slots" className="py-20 md:py-32 bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-balance">
            Book Your
            <span className="block text-primary">Perfect Slot</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Browse available time slots and book instantly
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Left Sidebar - Courts Selection */}
          <div className="lg:col-span-1">
            <div className="bg-muted dark:bg-slate-800 rounded-xl p-6 border border-border dark:border-slate-700 sticky top-24">
              <h3 className="font-bold text-lg mb-4 text-foreground">Select Court</h3>
              
              <div className="space-y-3">
                {courts.map((court) => (
                  <button
                    key={court.id}
                    onClick={() => setSelectedCourt(court.id)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                      selectedCourt === court.id
                        ? 'border-primary bg-primary/5 dark:bg-primary/10'
                        : 'border-border dark:border-slate-700 hover:border-primary/50'
                    }`}
                  >
                    <p className="font-semibold text-foreground">{court.name}</p>
                    <p className="text-sm text-foreground/60 mt-1">{court.location}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className={`text-xs font-bold px-2 py-1 rounded ${
                        court.status === 'Available' 
                          ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' 
                          : 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                      }`}>
                        {court.status}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Date Selection */}
              <div className="mt-8 pt-8 border-t border-border dark:border-slate-700">
                <h3 className="font-bold text-lg mb-4 text-foreground flex items-center gap-2">
                  <Calendar size={18} />
                  Date
                </h3>
                
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedDate('today')}
                    className={`w-full p-3 rounded-lg border-2 transition-all ${
                      selectedDate === 'today'
                        ? 'border-primary bg-primary/5 dark:bg-primary/10'
                        : 'border-border dark:border-slate-700'
                    }`}
                  >
                    <p className="font-semibold text-foreground">Today</p>
                    <p className="text-xs text-foreground/60">Jun 3</p>
                  </button>
                  
                  <button
                    onClick={() => setSelectedDate('tomorrow')}
                    className={`w-full p-3 rounded-lg border-2 transition-all ${
                      selectedDate === 'tomorrow'
                        ? 'border-primary bg-primary/5 dark:bg-primary/10'
                        : 'border-border dark:border-slate-700'
                    }`}
                  >
                    <p className="font-semibold text-foreground">Tomorrow</p>
                    <p className="text-xs text-foreground/60">Jun 4</p>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Time Slots */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-foreground">Available Slots</h3>
                <select className="px-4 py-2 bg-muted dark:bg-slate-800 border border-border dark:border-slate-700 rounded-lg text-foreground font-semibold">
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Time: Morning First</option>
                  <option>Time: Evening First</option>
                </select>
              </div>

              {/* Slots Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {timeSlots.map((slot, idx) => (
                  <button
                    key={idx}
                    disabled={!slot.available}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 text-left font-semibold ${
                      slot.available
                        ? 'border-border dark:border-slate-700 hover:border-primary dark:hover:border-primary bg-background dark:bg-slate-800 hover:bg-primary/5 dark:hover:bg-primary/10 cursor-pointer'
                        : 'border-border/50 dark:border-slate-700/50 bg-muted dark:bg-slate-900 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-foreground">{slot.time}</span>
                      {!slot.available && (
                        <span className="text-xs bg-red-500/20 text-red-600 dark:text-red-400 px-2 py-1 rounded font-bold">
                          Booked
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-bold flex items-center gap-1">
                        <DollarSign size={16} />
                        {slot.price.replace('$', '')}
                      </span>
                      <div className={`w-3 h-3 rounded-full ${
                        slot.available ? 'bg-emerald-500' : 'bg-red-500'
                      }`} />
                    </div>
                  </button>
                ))}
              </div>

              {/* Booking Summary */}
              <div className="mt-12 bg-primary/10 dark:bg-primary/5 border border-primary rounded-xl p-8">
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <p className="text-sm text-foreground/60 mb-2">Selected Court</p>
                    <p className="text-xl font-bold text-foreground">
                      {courts.find(c => c.id === selectedCourt)?.name}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-foreground/60 mb-2">Time Slot</p>
                    <p className="text-xl font-bold text-foreground">6:00 PM - 7:00 PM</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-foreground/60 mb-2">Total Price</p>
                    <p className="text-2xl font-bold text-primary">$35</p>
                  </div>
                </div>
                
                <button className="w-full mt-6 px-8 py-3 bg-primary hover:bg-primary_dark text-white rounded-lg font-bold transition-colors">
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
