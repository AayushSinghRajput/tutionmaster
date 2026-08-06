const useTeacherFormHandlers = ({
 watchSubjects,
 setValue,
 appendQualification,
 setAvatarFile,
 setCvFile,
 setSelectedState
})=>{


const handleAvatarUpload=(file)=>{

 setAvatarFile(file);

};



const handleAvatarRemove=()=>{

 setAvatarFile(null);

};



const handleCVUpload=(file)=>{

 setCvFile(file);

};



const handleCVRemove=()=>{

 setCvFile(null);

};




const addQualification=()=>{

appendQualification({

degree:"",
institution:"",
year:new Date().getFullYear()

});


};





const handleSubjectToggle = (subjects) => {
  setValue(
    "preferredSubjects",
    subjects,
    {
      shouldValidate:true,
      shouldDirty:true
    }
  );
  return{
    handleSubjectToggle,
  }

};






const handleStateChange=(e)=>{

const state =
e.target.value;


setValue(
"address.state",
state
);


setSelectedState(state);


};





const handleCityChange=(e)=>{


setValue(
"address.city",
e.target.value
);


};






const handleAvailabilityChange=(availability)=>{


setValue(
"availability",
availability,
{
shouldValidate:true
}
);


};





return {

handleAvatarUpload,

handleAvatarRemove,

handleCVUpload,

handleCVRemove,

addQualification,

handleSubjectToggle,

handleStateChange,

handleCityChange,

handleAvailabilityChange

};



};


export default useTeacherFormHandlers;