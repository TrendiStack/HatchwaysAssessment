import React, { useState } from "react";

const StudentCard = ({ student }) => {
  const grades = student?.grades;
  const sum = grades.reduce((a, b) => Number(a) + Number(b));
  const average = sum / grades.length;
  const [dropDown, setDropDown] = useState(false);
  const [tag, setTag] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    student.tags.push(tag);
    setTag("");
  };
  return (
    <div className="flex items-start gap-x-6 border-b-[1px] my-2 pb-3">
      <div>
        <img
          className="w-[80px] border-[1px] border-#e5e7eb rounded-full"
          src={student.pic}
          alt={student.firstName}
        />
      </div>
      <div>
        <h1 className="font-bold text-3xl mb-3">{`${student?.firstName} ${student?.lastName}`}</h1>
        <div className="ml-4 font-light">
          <p>{`Email: ${student?.email}`}</p>
          <p>{`Company: ${student?.company}`}</p>
          <p>{`Skill: ${student?.skill}`}</p>
          <p className="mb-2">{`Average: ${average}%`}</p>
          <div className="">
            <div className="grid grid-cols-4 gap-2 text-center">
              {student.tags.map((tag, index) => (
                <p key={index} className=" bg-gray-300 px-2 py-1 rounded">
                  {tag}
                </p>
              ))}
            </div>
            <form onSubmit={submitHandler}>
              <input
                onChange={(e) => setTag(e.target.value)}
                className="mt-3 border-b-[1.5px]"
                type="text"
                placeholder="Add new tag"
                value={tag}
              />
            </form>
          </div>
        </div>
        {dropDown && (
          <div className="ml-4 mt-3 font-light">
            {grades.map((grade, i) => (
              <div className="flex gap-x-6">
                <p>Test {i + 1}:</p>
                <p>{grade}%</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        onClick={() => setDropDown(!dropDown)}
        className="relative bottom-[5px] text-4xl ml-auto mr-3 "
      >
        {dropDown ? "-" : "+"}
      </button>
    </div>
  );
};

export default StudentCard;
