import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { teacherService } from "../services/teacherService";
import TeacherForm from "../components/teachers/TeacherForm";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { toast } from "react-toastify";

const EditProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await teacherService.getMyProfile();
      console.log("Profile data loaded:", response.data.data);
      console.log(
        "Availability in loaded profile:",
        response.data.data.availability,
      );
      setProfile(response.data.data);
      setFormKey((prev) => prev + 1);
    } catch (error) {
      toast.error("Failed to load profile");
      console.error("Error fetching profile:", error);
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (profileData) => {
    setUpdating(true);
    try {
      await teacherService.updateTeacher(profile._id, profileData);
      toast.success("Profile updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      const message = error.response?.data?.error || "Failed to update profile";
      toast.error(message);
      console.error("Error updating profile:", error);
    } finally {
      setUpdating(false);
    }
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  if (loading) {
    return <LoadingSpinner text="Loading your profile..." />;
  }

  if (updating) {
    return <LoadingSpinner text="Updating your profile..." />;
  }

  // Don't render TeacherForm until profile data is fully available
  if (!profile) {
    return <LoadingSpinner text="Preparing form..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Edit Your Profile
            </h1>
            <p className="text-lg text-gray-600">
              Update your information to keep your profile current
            </p>
          </div>

          <TeacherForm
            key={formKey}
            initialData={profile}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitButtonText="Update Profile"
            cancelButtonText="Cancel"
            isEdit={true}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
