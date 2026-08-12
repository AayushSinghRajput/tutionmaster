import { Star } from "lucide-react";

const ProfileReadyBanner = () => (
  <div className="bg-gradient-to-r from-success-600 to-success-700 rounded-2xl p-5 sm:p-8 text-white text-center shadow-lg w-full">
    <Star className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4" />
    <h3 className="font-serif font-bold text-xl sm:text-2xl mb-2 sm:mb-3">Ready to Complete Your Profile!</h3>
    <p className="text-success-100 text-base sm:text-lg">
      Review all your information before submitting. You can always come back
      and update your profile later to keep it current and engaging for
      students.
    </p>
  </div>
);

export default ProfileReadyBanner;
