import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";


import useTeacherFormDefaults
    from "./useTeacherForm/useTeacherFormDefaults";


import useTeacherFormHandlers
    from "./useTeacherForm/useTeacherFormHandlers";


import useTeacherFormValidation
    from "./useTeacherForm/useTeacherFormValidation";


import useTeacherFormPersistence
    from "./useTeacherForm/useTeacherFormPersistence";



const useTeacherForm = ({
    initialData,
    onSubmit,
    isEdit
}) => {

    const { user } = useAuth();



    const [avatarFile, setAvatarFile] =
        useState(null);


    const [cvFile, setCvFile] =
        useState(null);



    const [selectedState, setSelectedState] =
        useState("");



    const [isFormReady, setIsFormReady] =
        useState(false);



    const [currentStep, setCurrentStep] =
        useState(1);



    const [isNavigating, setIsNavigating] =
        useState(false);



    const [formErrors, setFormErrors] =
        useState({});




    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        getValues,
        reset,
        trigger,
        formState: {
            errors,
            isSubmitting
        }
    }
        =
        useForm({

            defaultValues: {

                name: "",

                contact: {
                    email: "",
                    phone: ""
                },


                address: {
                    street: "",
                    city: "",
                    state: "",
                    zipCode: ""
                },


                qualifications: [
                    {
                        degree: "",
                        institution: "",
                        year: new Date().getFullYear()
                    }
                ],


                preferredSubjects: [],


                bio: "",

                experience: 0,

                hourlyRate: 0,

                teachingMode: "Both",

                availability: []

            }

        });






    const {
        fields: qualificationFields,
        append: appendQualification,
        remove: removeQualification

    }
        =
        useFieldArray({

            control,

            name: "qualifications"

        });






    const watchSubjects =
        watch(
            "preferredSubjects",
            []
        );



    const watchAvailability =
        watch(
            "availability",
            []
        );



    const availabilityPickerKey =
        `availability-${watchAvailability?.length}-${isFormReady}`;







    useTeacherFormDefaults({

        initialData,

        reset,

        setAvatarFile,

        setCvFile,

        setSelectedState,

        setIsFormReady

    });




    useTeacherFormPersistence({

        enabled: !isEdit,

        userId: user?.id,

        watch,

        getValues,

        reset,

        currentStep,

        setCurrentStep

    });







    const handlers =
        useTeacherFormHandlers({

            watchSubjects,

            setValue,

            appendQualification,

            setAvatarFile,

            setCvFile,

            setSelectedState

        });







    const validation =
        useTeacherFormValidation({

            watchAvailability,

            setFormErrors,

            setCurrentStep,

            avatarFile,

            cvFile,

            onSubmit

        });






    const nextStep = async () => {

        if (isNavigating) return;

        setIsNavigating(true);

        try {

            const valid =
                await validation.validateStep(
                    currentStep,
                    trigger
                );



            if (valid) {

                setCurrentStep(
                    prev => Math.min(prev + 1, 4)
                );

                // Keep the guard up briefly after advancing so a same-spot
                // repeat click can't land on the button after it has
                // morphed from "Next Step" into the submit action.
                await new Promise(
                    resolve => setTimeout(resolve, 400)
                );

            }

        } finally {

            setIsNavigating(false);

        }


    };






    const prevStep = () => {


        setCurrentStep(
            prev => Math.max(prev - 1, 1)
        );


    };






    return {


        currentStep,

        isNavigating,

        formErrors,

        avatarFile,

        cvFile,

        selectedState,

        isFormReady,


        register,

        handleSubmit,

        watch,

        setValue,

        errors,

        isSubmitting,


        qualificationFields,

        removeQualification,


        watchSubjects,

        watchAvailability,

        availabilityPickerKey,



        ...handlers,


        ...validation,


        nextStep,

        prevStep,


        handleFormSubmit:
            validation.handleFormSubmit


    };



};



export default useTeacherForm;