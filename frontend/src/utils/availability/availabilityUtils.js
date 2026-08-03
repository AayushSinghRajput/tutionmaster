/**
 * Availability utility functions
 * Used by AvailabilityPicker, form validation and submission logic
 */


/**
 * Convert AM/PM time to minutes from midnight
 *
 * Example:
 * "08:30 AM" -> 510
 * "05:00 PM" -> 1020
 */
export const timeToMinutes = (time) => {
  if (!time) return null;

  const match = time
    .trim()
    .match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);

  if (!match) return null;

  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const period = match[3].toUpperCase();


  if (
    hours < 1 ||
    hours > 12 ||
    minutes < 0 ||
    minutes > 59
  ) {
    return null;
  }


  if (period === "AM") {
    if (hours === 12) hours = 0;
  } else {
    if (hours !== 12) hours += 12;
  }


  return hours * 60 + minutes;
};



/**
 * Convert 24 hour time to AM/PM
 *
 * Example:
 * "17:30" -> "05:30 PM"
 */
export const convert24To12 = (time24) => {

  if (!time24) return "";

  const [hours, minutes] = time24.split(":");

  let hour = Number(hours);

  const period = hour >= 12 ? "PM" : "AM";

  hour = hour % 12 || 12;


  return `${String(hour).padStart(2,"0")}:${minutes} ${period}`;

};



/**
 * Convert AM/PM to backend format
 *
 * Example:
 * "05:30 PM" -> "17:30"
 */
export const convert12To24 = (time12) => {

  const minutes = timeToMinutes(time12);

  if (minutes === null) return null;


  const hours = Math.floor(minutes / 60);

  const mins = minutes % 60;


  return `${String(hours).padStart(2,"0")}:${String(mins).padStart(2,"0")}`;

};



/**
 * Validate time format
 */
export const isValidTime = (time) => {
  return timeToMinutes(time) !== null;
};



/**
 * Check if end time is after start time
 */
export const isValidTimeRange = (
  startTime,
  endTime
)=>{

  const start = timeToMinutes(startTime);
  const end = timeToMinutes(endTime);


  if(start === null || end === null){
    return false;
  }


  return start < end;

};



/**
 * Check two slots overlap
 *
 * Example:
 *
 * 08:00 - 10:00
 * 09:00 - 11:00
 *
 * returns true
 */
export const isSlotOverlap = (
  first,
  second
)=>{

  const firstStart =
    timeToMinutes(first.startTime);

  const firstEnd =
    timeToMinutes(first.endTime);


  const secondStart =
    timeToMinutes(second.startTime);

  const secondEnd =
    timeToMinutes(second.endTime);



  if(
    firstStart === null ||
    firstEnd === null ||
    secondStart === null ||
    secondEnd === null
  ){
    return false;
  }



  return (
    firstStart < secondEnd &&
    secondStart < firstEnd
  );

};



/**
 * Check all slots of a day
 * for overlapping
 */
export const hasOverlappingSlots = (
  slots=[]
)=>{


  for(let i=0;i<slots.length;i++){

    for(let j=i+1;j<slots.length;j++){

      if(
        isSlotOverlap(
          slots[i],
          slots[j]
        )
      ){
        return true;
      }

    }

  }


  return false;

};




/**
 * Sort slots by start time
 */
export const sortTimeSlots = (
  slots=[]
)=>{

 return [...slots].sort(
  (a,b)=>
    timeToMinutes(a.startTime) -
    timeToMinutes(b.startTime)
 );

};



/**
 * Check duplicate slots
 */
export const hasDuplicateSlots = (
 slots=[]
)=>{

 const unique = new Set();


 for(const slot of slots){

  const key =
   `${slot.startTime}-${slot.endTime}`;


  if(unique.has(key)){
    return true;
  }


  unique.add(key);

 }


 return false;

};



/**
 * Validate complete availability object
 */
export const validateAvailability = (
 availability=[]
)=>{


 const errors={};


 if(!availability.length){

  return {
    isValid:false,
    errors:{
      availability:
      "At least one availability day is required"
    }
  };

 }



 availability.forEach(
 (day,index)=>{


   if(!day.day){

    errors[index]={
      day:"Day is required"
    };

    return;
   }



   if(
    !day.timeSlots ||
    !day.timeSlots.length
   ){

    errors[index]={
      timeSlots:
      "At least one time slot is required"
    };

    return;
   }



   day.timeSlots.forEach(
   (slot,slotIndex)=>{


    if(!isValidTime(slot.startTime)){

      errors[index]={
        ...errors[index],
        [slotIndex]:{
          startTime:
          "Invalid start time"
        }
      };

    }



    if(!isValidTime(slot.endTime)){

      errors[index]={
        ...errors[index],
        [slotIndex]:{
          ...errors[index]?.[slotIndex],
          endTime:
          "Invalid end time"
        }
      };

    }



    if(
      isValidTimeRange(
        slot.startTime,
        slot.endTime
      )===false
    ){

      errors[index]={
        ...errors[index],
        [slotIndex]:{
          ...errors[index]?.[slotIndex],
          time:
          "End time must be after start time"
        }
      };

    }


   });


   if(
    hasOverlappingSlots(
      day.timeSlots
    )
   ){

    errors[index]={
      ...errors[index],
      overlap:
      "Time slots cannot overlap"
    };

   }


 });



 return {
  isValid:Object.keys(errors).length===0,
  errors
 };


};