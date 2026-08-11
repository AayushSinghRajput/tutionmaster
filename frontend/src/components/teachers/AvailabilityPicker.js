import { useState } from "react";
import {
  Clock,
  Plus,
  Trash2,
  AlertCircle,
  Copy,
} from "lucide-react";

import {
  isValidTime,
  hasOverlappingSlots,
} from "../../utils/availability/availabilityUtils";


const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];


const DEFAULT_SLOT = {
  startTime: "09:00 AM",
  endTime: "05:00 PM",
};



/*
 Time Input Component
*/
const TimeField = ({
  label,
  value,
  onChange,
}) => {


  const time =
    value?.split(" ")[0] || "";


  const period =
    value?.split(" ")[1] || "AM";


  const updateTime = (newTime, newPeriod) => {

    onChange(
      `${newTime} ${newPeriod}`
    );

  };



  return (

    <div>

      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>


      <div className="flex gap-2">


        <input
          type="text"
          value={time}
          placeholder="09:00"
          onChange={(e) =>
            updateTime(
              e.target.value,
              period
            )
          }
          className="
w-24 px-3 py-2
border rounded-lg
"
        />



        <div className="
flex border rounded-lg overflow-hidden
">


          {
            ["AM", "PM"].map(p => (

              <button
                key={p}
                type="button"
                onClick={() =>
                  updateTime(time, p)
                }
                className={`
px-3 py-2 text-sm
${period === p
                    ?
                    "bg-blue-600 text-white"
                    :
                    "bg-white text-gray-600"
                  }
`}
              >

                {p}

              </button>

            ))

          }


        </div>


      </div>



      {
        value &&
        !isValidTime(value)
        &&

        <p className="text-xs text-red-600 mt-1 flex items-center">

          <AlertCircle
            className="w-3 h-3 mr-1"
          />

          Invalid format

        </p>

      }


    </div>

  );

};





const AvailabilityPicker = ({
  value = [],
  onChange,
}) => {


  const [copySource, setCopySource] =
    useState(null);



  const updateAvailability = (updated) => {

    onChange(updated);

  };




  const getDayData = (day) => {

    return (
      value.find(
        item => item.day === day
      )
      ||
      {
        day,
        timeSlots: []
      }
    );

  };




  /*
   Select / remove day
  */
  const toggleDay = (day) => {


    const exists =
      value.some(
        item => item.day === day
      );



    if (exists) {

      updateAvailability(
        value.filter(
          item => item.day !== day
        )
      );


    }

    else {


      updateAvailability(
        [
          ...value,
          {
            day,
            timeSlots: [
              { ...DEFAULT_SLOT }
            ]
          }
        ]
      );


    }



  };





  /*
   Add slot
  */
  const addSlot = (day) => {


    const updated =
      value.map(item => {


        if (item.day !== day)
          return item;


        return {

          ...item,

          timeSlots: [
            ...item.timeSlots,
            {
              ...DEFAULT_SLOT
            }
          ]

        };


      });


    updateAvailability(updated);

  };






  /*
   Remove slot
  */
  const removeSlot = (day, index) => {


    const updated =
      value.map(item => {


        if (item.day !== day)
          return item;


        return {

          ...item,

          timeSlots:
            item.timeSlots.filter(
              (_, i) => i !== index
            )

        };


      });


    updateAvailability(updated);


  };






  /*
   Update slot
  */
  const updateSlot = (
    day,
    slotIndex,
    field,
    newValue
  ) => {


    const updated =
      value.map(item => {


        if (item.day !== day)
          return item;



        return {

          ...item,

          timeSlots:
            item.timeSlots.map(
              (slot, index) =>

                index === slotIndex
                  ?
                  {
                    ...slot,
                    [field]: newValue
                  }
                  :
                  slot

            )

        };


      });


    updateAvailability(updated);


  };






  /*
   Copy schedule
  */
  const copySchedule = (sourceDay) => {


    const source =
      getDayData(sourceDay);


    if (
      !source.timeSlots.length
    )
      return;



    const updated =
      value.map(item => {


        if (
          item.day === sourceDay
        )
          return item;



        return {

          ...item,

          timeSlots:
            source.timeSlots.map(
              slot => ({ ...slot })
            )

        };


      });



    updateAvailability(updated);

  };







  return (

    <div className="space-y-6">


      <div className="
flex flex-wrap justify-between items-center gap-2
">

        <h3 className="
font-bold text-lg sm:text-xl
flex items-center
">

          <Clock
            className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-blue-600 shrink-0"
          />

          Weekly Availability

        </h3>


        <div className="
bg-blue-50 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl
text-xs sm:text-sm whitespace-nowrap
">

          {
            value.length
          }
          days selected

        </div>


      </div>





      <p className="
text-sm text-gray-600
">

        Select your available days and set
        individual schedules.

      </p>





      <div className="
grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4
">


        {
          DAYS_OF_WEEK.map(day => {


            const selected =
              value.some(
                item => item.day === day
              );



            return (

              <button

                key={day}

                type="button"

                onClick={() =>
                  toggleDay(day)
                }

                className={`
p-4 rounded-xl border-2
flex justify-between
${selected
                    ?
                    "border-blue-600 bg-blue-100"
                    :
                    "border-gray-300"
                  }
`}

              >

                <span>
                  {day}
                </span>


                {
                  selected
                    ?
                    <span className="
w-3 h-3 rounded-full bg-green-500
"/>
                    :
                    <Plus className="w-5 h-5" />
                }


              </button>


            );


          })

        }


      </div>








      {
        value.map(dayData => (


          <div
            key={dayData.day}
            className="
bg-white border rounded-2xl p-4 sm:p-6
shadow-sm
"
          >



            <div className="
flex flex-wrap justify-between items-center gap-2 mb-4 sm:mb-5
">


              <h4 className="
font-bold text-base sm:text-lg
">

                {dayData.day}

              </h4>



              <button

                type="button"

                onClick={() =>
                  copySchedule(dayData.day)
                }

                className="
flex items-center gap-2
text-blue-600
text-xs sm:text-sm shrink-0
"

              >

                <Copy className="w-4 h-4" />

                Copy to all days

              </button>



            </div>





            {
              dayData.timeSlots.map(
                (slot, index) => (


                  <div
                    key={index}
                    className="
grid sm:grid-cols-3 gap-3 sm:gap-4
items-end mb-4
"
                  >



                    <TimeField

                      label="Start"

                      value={slot.startTime}

                      onChange={(v) =>
                        updateSlot(
                          dayData.day,
                          index,
                          "startTime",
                          v
                        )
                      }

                    />



                    <TimeField

                      label="End"

                      value={slot.endTime}

                      onChange={(v) =>
                        updateSlot(
                          dayData.day,
                          index,
                          "endTime",
                          v
                        )
                      }

                    />




                    <button

                      type="button"

                      onClick={() =>
                        removeSlot(
                          dayData.day,
                          index
                        )
                      }

                      className="
text-red-600
border border-red-200
rounded-lg
p-2
"

                    >

                      <Trash2
                        className="w-4 h-4"
                      />


                    </button>




                  </div>


                )

              )



            }






            {
              hasOverlappingSlots(
                dayData.timeSlots
              )
              &&

              <p className="
text-red-600 text-sm flex items-center
">

                <AlertCircle
                  className="w-4 h-4 mr-2"
                />

                Time slots overlap

              </p>

            }




            <button

              type="button"

              onClick={() =>
                addSlot(dayData.day)
              }

              className="
mt-3
text-blue-600
flex items-center gap-2
"

            >

              <Plus className="w-4 h-4" />

              Add Time Slot

            </button>





          </div>


        ))

      }




    </div>

  );

};


export default AvailabilityPicker;