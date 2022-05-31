import axios from "axios";
import React, { useState, useEffect } from "react";
import StudentCard from "../components/StudentCard";
import { AiOutlineLoading } from "react-icons/ai";
import { StudentList } from "../utils/api";

const Main = () => {
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [tagSearch, setTagSearch] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await axios.get(StudentList).then((res) => {
          let newArray = [];
          const data = res.data.students;
          data.map((student) => {
            student.tags = [];
            newArray.push(student);
          });
          setStudents(data);
        });
        setLoading(false);
      } catch (error) {
        console.log("Error Received", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = () => {
    return students.filter(
      (student) =>
        student.firstName.toLowerCase().includes(search.toLowerCase()) ||
        student.lastName.toLowerCase().includes(search.toLowerCase())
    );
  };
  const handleTagSearch = () => {
    // eslint-disable-next-line array-callback-return
    return students.filter((student) => {
      if (tagSearch === "") {
        return student;
      } else if (
        student.tags.find((tag) =>
          tag.toLowerCase().includes(tagSearch.toLowerCase())
        )
      ) {
        return student;
      }
    });
  };

  return (
    <>
      {!loading ? (
        <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-5xl text-blue-600 ">
          <AiOutlineLoading className="animate-spin" />
        </div>
      ) : (
        <div className="xl:mx-[auto] 2xl:mx-[25vw]">
          <div>
            <input
              className="h-10 border-#e5e7eb border-solid border-b-2 bg-transparent w-full"
              placeholder="Search by name..."
              type="text"
              onChange={(e) => setSearch(e.target.value)}
            />
            <input
              className="h-10 border-#e5e7eb border-solid border-b-2 bg-transparent w-full"
              placeholder="Search by tag..."
              type="text"
              onChange={(e) => setTagSearch(e.target.value)}
            />
          </div>
          {search ? (
            <div>
              {handleSearch().map((student, index) => {
                return <StudentCard key={index} student={student} />;
              })}
            </div>
          ) : (
            <div>
              {handleTagSearch().map((student, index) => {
                return <StudentCard key={index} student={student} />;
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Main;
