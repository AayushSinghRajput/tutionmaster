import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import {
  loadTeacherProfileDraft,
  saveTeacherProfileDraft,
} from "../../../utils/formDraftStorage";

const SAVE_DEBOUNCE_MS = 500;

const useTeacherFormPersistence = ({
  enabled,
  userId,
  watch,
  getValues,
  reset,
  currentStep,
  setCurrentStep,
}) => {
  const restoredRef = useRef(false);
  const timeoutRef = useRef(null);

  // Restore a saved draft once, before the user can type anything.
  useEffect(() => {
    if (!enabled || restoredRef.current) return;
    restoredRef.current = true;

    const draft = loadTeacherProfileDraft(userId);
    if (!draft) return;

    reset(draft.values);
    if (draft.step) setCurrentStep(draft.step);
    toast.info("Welcome back — we restored your unfinished profile.");
  }, [enabled, userId, reset, setCurrentStep]);

  // Persist on every field change, debounced, and whenever the step changes.
  useEffect(() => {
    if (!enabled) return;

    const subscription = watch(() => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        saveTeacherProfileDraft(userId, getValues(), currentStep);
      }, SAVE_DEBOUNCE_MS);
    });

    return () => {
      subscription.unsubscribe();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [enabled, userId, watch, getValues, currentStep]);

  useEffect(() => {
    if (!enabled) return;
    saveTeacherProfileDraft(userId, getValues(), currentStep);
  }, [enabled, userId, currentStep, getValues]);
};

export default useTeacherFormPersistence;
