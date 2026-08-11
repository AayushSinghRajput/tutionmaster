import { MapPin, Phone, Mail } from 'lucide-react';

const ContactMap = () => {
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7066.245986802847!2d85.34502866980142!3d27.68259324943417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19d34436c277%3A0xc4d1871672e00006!2sUnique%20boys%20hostel!5e0!3m2!1sen!2snp!4v1785642899465!5m2!1sen!2snp";
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Visit Our Headquarters
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Located in the heart of the education district
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 sm:p-8 border border-blue-200">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2 bg-white rounded-xl p-4 sm:p-6 shadow-lg">
              <div className="w-full h-56 sm:h-64 bg-blue-200 rounded-lg flex items-center justify-center">
                <div className="w-full h-full">
                  {mapUrl ? (
                    <iframe
                      src={mapUrl}
                      width="100%"
                      height="100%"
                      className="w-full h-full rounded-lg border-0"
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      title="TuitionMaster Location"
                    />
                  ) : (
                    <div className="text-center text-blue-600 flex flex-col items-center justify-center h-full">
                      <MapPin className="w-12 h-12 mx-auto mb-3" />
                      <p className="font-semibold">Interactive Map</p>
                      <p className="text-sm text-blue-500">Kathmandu, Nepal</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-3">TutionMaster HQ</h3>
                <div className="space-y-2 text-gray-600">
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    Kathmandu, Nepal
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-blue-600" />
                    +977 (980) 598-1168
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-600" />
                    aayushsinghrajput3003@gmail.com
                  </p>
                </div>
              </div>

              <div className="bg-blue-25 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Parking</h4>
                <p className="text-sm text-gray-600">
                  Free parking available in the adjacent lot.
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
