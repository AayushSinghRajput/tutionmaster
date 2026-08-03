import { useEffect } from "react";



const convertTo12Hour = (time24) => {

  if (!time24) return "";

  const [hours, minutes] = time24.split(":").map(Number);

  const period = hours >= 12 ? "PM" : "AM";

  const hours12 = hours % 12 || 12;

  return `${hours12}:${minutes
    .toString()
    .padStart(2,"0")} ${period}`;
};



const transformAvailability = (availability = []) => {

 return availability.map(daySlot => ({

    day: daySlot.day,

    timeSlots:
      daySlot.timeSlots?.map(slot => ({

        startTime:
          slot.startTime.includes(":") &&
          !slot.startTime.includes("AM") &&
          !slot.startTime.includes("PM")
            ?
            convertTo12Hour(slot.startTime)
            :
            slot.startTime.toUpperCase(),


        endTime:
          slot.endTime.includes(":") &&
          !slot.endTime.includes("AM") &&
          !slot.endTime.includes("PM")
            ?
            convertTo12Hour(slot.endTime)
            :
            slot.endTime.toUpperCase()

      })) || []

 }));

};




const useTeacherFormDefaults = ({
 initialData,
 reset,
 setAvatarFile,
 setCvFile,
 setSelectedState,
 setIsFormReady
})=>{


useEffect(()=>{


if(!initialData)
 return;



const formData={


name:
initialData.name || "",


contact:{

email:
initialData.contact?.email || "",

phone:
initialData.contact?.phone || ""

},



address:{

street:
initialData.address?.street || "",

city:
initialData.address?.city || "",

state:
initialData.address?.state || "",

zipCode:
initialData.address?.zipCode || ""

},



qualifications:
initialData.qualifications || 
[
{
degree:"",
institution:"",
year:new Date().getFullYear()
}
],



preferredSubjects:
initialData.preferredSubjects || [],



bio:
initialData.bio || "",



experience:
initialData.experience || 0,



hourlyRate:
initialData.hourlyRate || 0,



teachingMode:
initialData.teachingMode || "Both",



availability:
transformAvailability(
initialData.availability
)

};



reset(formData);



if(initialData.avatarPublicId){

setAvatarFile({

publicId:
initialData.avatarPublicId,

url:
initialData.avatarUrl

});

}



if(initialData.cvPublicId){

setCvFile({

publicId:
initialData.cvPublicId,

url:
initialData.cvUrl

});

}




if(initialData.address?.state){

setSelectedState(
initialData.address.state
);

}




setIsFormReady(true);



},[
initialData
]);



};


export default useTeacherFormDefaults;