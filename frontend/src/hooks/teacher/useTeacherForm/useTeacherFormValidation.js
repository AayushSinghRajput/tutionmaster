import { validateTeacherProfile } from "../../../utils/validation";


const toMinutes=(time)=>{


const match =
/^(\d{1,2}):(\d{2})\s?(AM|PM)$/i
.exec(time);



if(!match)
return null;



let hour =
Number(match[1]);

const minute =
Number(match[2]);

const period =
match[3].toUpperCase();



if(period==="PM" && hour!==12)
hour+=12;



if(period==="AM" && hour===12)
hour=0;



return hour*60+minute;


};





const validateAvailability=(availability)=>{


const errors={};



availability.forEach(
(day,index)=>{


day.timeSlots.forEach(
(slot,slotIndex)=>{


const start =
toMinutes(slot.startTime);


const end =
toMinutes(slot.endTime);



if(start===null){

errors[index]={
startTime:"Invalid start time"
};

}



if(end===null){

errors[index]={
endTime:"Invalid end time"
};

}




if(start!==null &&
end!==null &&
start>=end
){

errors[index]={

timeLogic:
"End time must be after start time"

};


}



}

);


});


return errors;


};







const useTeacherFormValidation=({

watchAvailability,
setFormErrors,
setCurrentStep,
avatarFile,
cvFile,
onSubmit

})=>{





const validateStep=async(
currentStep,
trigger
)=>{


let valid=false;



if(currentStep===1){


valid=
await trigger([
"name",
"contact.email",
"contact.phone",
"address.street",
"address.state",
"address.city"
]);


}



else if(currentStep===2){


valid=
await trigger([
"qualifications",
"preferredSubjects"
]);


}



else if(currentStep===3){


valid=
await trigger([
"experience",
"hourlyRate",
"teachingMode",
"bio"
]);


}



else{


const availability =
watchAvailability || [];



if(!availability.length){

setFormErrors({

availability:
"Please add availability"

});


return false;

}




const errors =
validateAvailability(
availability
);



if(Object.keys(errors).length){


setFormErrors({

availability:errors

});


return false;

}



valid=true;



}



return valid;



};







const handleFormSubmit=async(data)=>{


const validation =
validateTeacherProfile(data);



if(!validation.isValid){

setFormErrors(
validation.errors
);

return;

}



await onSubmit({
    

...data,

avatarPublicId:
avatarFile?.publicId || null,


cvPublicId:
cvFile?.publicId || null


});



};





return {

validateStep,

handleFormSubmit

};


};



export default useTeacherFormValidation;