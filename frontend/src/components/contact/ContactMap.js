import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const ContactMap = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Visit Our Headquarters
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Located in the heart of the education district
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-lg">
              <div className="w-full h-64 bg-blue-200 rounded-lg flex items-center justify-center">
                <div className="text-center text-blue-600">
                  <MapPin className="w-12 h-12 mx-auto mb-3" />
                  <p className="font-semibold">Interactive Map</p>
                  <p className="text-sm text-blue-500">123 Education Street, Learning City</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-3">TutionMaster HQ</h3>
                <div className="space-y-2 text-gray-600">
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    123 Education Street<br />
                    Learning City, LC 12345
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-blue-600" />
                    +1 (555) 123-4567
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-600" />
                    hello@tutionmaster.com
                  </p>
                </div>
              </div>
              
              <div className="bg-blue-25 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Parking & Access</h4>
                <p className="text-sm text-gray-600">
                  Free parking available in the adjacent lot. Our building is wheelchair accessible with elevator access to all floors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMap;
