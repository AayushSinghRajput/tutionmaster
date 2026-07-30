import { Shield, Lock, Server } from 'lucide-react';

const SECURITY_FEATURES = [
  { icon: Shield, title: 'Encryption', desc: 'End-to-end encryption for all data' },
  { icon: Lock, title: 'Access Control', desc: 'Role-based access permissions' },
  { icon: Server, title: 'Secure Storage', desc: 'Enterprise-grade infrastructure' },
];

const SecuritySection = () => {
  return (
    <section id="security" className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <Lock className="w-6 h-6 text-blue-600 mr-3" />
        Data Security
      </h2>
      <div className="grid md:grid-cols-3 gap-6 text-center">
        {SECURITY_FEATURES.map((item) => (
          <div key={item.title} className="p-6 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
            <item.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
            <p className="text-gray-700 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SecuritySection;