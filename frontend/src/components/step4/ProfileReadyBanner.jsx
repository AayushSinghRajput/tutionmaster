import { Star } from "lucide-react";

const ProfileReadyBanner = () => (
  <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white text-center shadow-lg w-full">
    <Star className="w-12 h-12 mx-auto mb-4" />
    <h3 className="font-bold text-2xl mb-3">Ready to Complete Your Profile!</h3>
    <p className="text-green-100 text-lg">
      Review all your information before submitting. You can always come back
      and update your profile later to keep it current and engaging for
      students.
    </p>
  </div>
);

export default ProfileReadyBanner;
