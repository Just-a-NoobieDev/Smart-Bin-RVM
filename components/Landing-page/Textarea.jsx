"use client";
const Textarea = () => {
  return (
    <textarea
      name="message"
      id="message"
      cols="30"
      rows="3"
      style={{ paddingLeft: "10px" }}
      className={`rounded-md bg-transparent border-solid border-white border-[1px] w-[226px] tabs:w-[370px] tabs:h-[80px] laps:h-[120px] wide:w-[400px] wide:h-[100px] `}
    ></textarea>
  );
};

export default Textarea;
