import { useEffect, useRef } from "react";

const useTeacherFormAccountPrefill = ({
  enabled,
  user,
  getValues,
  setValue,
}) => {
  const prefilledRef = useRef(false);

  useEffect(() => {
    if (!enabled || prefilledRef.current || !user) return;
    prefilledRef.current = true;

    if (!getValues("name") && user.username) {
      setValue("name", user.username);
    }

    if (!getValues("contact.email") && user.email) {
      setValue("contact.email", user.email);
    }
  }, [enabled, user, getValues, setValue]);
};

export default useTeacherFormAccountPrefill;
