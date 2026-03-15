import { useEffect, useState } from "react";
import { FaPlusCircle, FaEdit, FaTrash } from "react-icons/fa";

import { axiosInstance } from "../../../../config/httpClient";
import { GROUPS_URLS, STUDENT_URLS } from "../../../../config/api.endPoint";
import type { CreateGroupPayload, Group, Student } from "../../type";
import { toast } from "react-toastify";
import DeleteConfirmModal from "../../../../shared/components/DeleteConfirm/DeleteConfirm";
import { ClipLoader } from "react-spinners";



export default function Groups() {

  const [groups, setGroups] = useState<Group[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);

  const [modalType, setModalType] = useState<"create" | "update" | "delete" | null>(null);

  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  const [groupName, setGroupName] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [groupStudents, setGroupStudents] = useState<string[]>([]);

  const getGroups = async () => {
    try {

      setLoading(true);

      const response = await axiosInstance.get(GROUPS_URLS.GET_ALL);

      setGroups(response.data);

    } catch (error: any) {

      toast.error(
        error.response?.data?.message || "Something went wrong"
      );

    } finally {

      setLoading(false);

    }
  };

  const getStudents = async () => {
    try {

      const response = await axiosInstance.get(
        STUDENT_URLS.GET_STUDENTS_WITHOUT_GROUP
      );

      setStudents(response.data);

    } catch (error: any) {

      toast.error(
        error.response?.data?.message || "Failed to load students"
      );

    }
  };

  const addGroup = async () => {
    try {

      const data: CreateGroupPayload = {
        name: groupName,
        students: groupStudents
      };

      await axiosInstance.post(GROUPS_URLS.CREATE_GROUP, data);

      toast.success("Group added successfully");

      setModalType(null);

      setGroupName("");
      setGroupStudents([]);

      getGroups();

    } catch (error: any) {

      toast.error(
        error.response?.data?.message || "Failed to add group"
      );

    }
  };

  const updateGroup = async () => {
    try {

      await axiosInstance.put(
        GROUPS_URLS.UPDATE_GROUP(selectedGroup?._id as string),
        {
          name: groupName,
          students: groupStudents
        }
      );

      toast.success("Group updated successfully");

      setModalType(null);

      getGroups();

    } catch (error: any) {

      toast.error(
        error.response?.data?.message || "Failed to update group"
      );

    }
  };

  const deleteGroup = async () => {
    try {

      await axiosInstance.delete(
        GROUPS_URLS.DELETE_GROUP(selectedGroup?._id as string)
      );

      toast.success("Group deleted");

      setModalType(null);

      getGroups();

    } catch (error: any) {

      toast.error(
        error.response?.data?.message || "Failed to delete group"
      );

    }
  };

  useEffect(() => {

    getGroups();
    getStudents();

  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <ClipLoader size={40} color='#288131'  />
      </div>
    );
  }

  return (
    <>
      <div className="p-6">

        <div className="flex justify-center items-center mb-6">

          <button
            onClick={() => {
              setModalType("create");
              setGroupName("");
              setGroupStudents([]);
            }}
            className="ml-auto flex items-center gap-2 border border-gray-200 px-3 py-1 rounded-md hover:bg-gray-50 text-sm font-medium"
          >
            <FaPlusCircle className="text-gray-600"/>
            Add Group
          </button>

        </div>

        <div className="border border-gray-200 rounded-2xl bg-white p-8">

          <h2 className="text-2xl p-3">Groups list</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">

            {groups.length > 0 ? (
              groups.map((group) => (
                <div
                  key={group._id}
                  className="border border-gray-200 rounded-xl p-4 flex justify-between items-center hover:shadow-md transition"
                >

                  <div>

                    <h3 className="font-semibold">
                      Group : {group.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      No. of students : {group.students.length}
                    </p>

                  </div>

                  <div className="flex gap-3 text-gray-500">

                    <button
                      onClick={() => {
                        setSelectedGroup(group);
                        setGroupName(group.name);
                        setGroupStudents(group.students);
                        setModalType("update");
                      }}
                      className="hover:text-green-600"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => {
                        setSelectedGroup(group);
                        setModalType("delete");
                      }}
                      className="hover:text-red-600"
                    >
                      <FaTrash />
                    </button>

                  </div>

                </div>
              ))
            ) : (
              <p>No groups found</p>
            )}

          </div>

        </div>

      </div>

      {(modalType === "create" || modalType === "update") && (

        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">

          <div className="bg-white w-[520px] rounded-xl shadow-lg">

            <div className="flex justify-between items-center px-6 py-4">

              <h3 className="font-semibold text-lg">

                {modalType === "create" && "Set up a new Group"}
                {modalType === "update" && "Update Group"}

              </h3>

              <div className="flex gap-4 text-lg">

                <button
                  onClick={() => {
                    if (modalType === "create") addGroup();
                    if (modalType === "update") updateGroup();
                  }}
                  className="font-bold hover:scale-110"
                >
                  ✓
                </button>

                <button
                  onClick={() => setModalType(null)}
                  className="font-bold hover:scale-110"
                >
                  ✕
                </button>

              </div>

            </div>

            <div className="p-6 space-y-5">

              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">

                <span className="bg-orange-100 text-sm px-3 py-2 border-r border-gray-300">
                  Group Name
                </span>

                <input
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="flex-1 p-2 outline-none"
                  placeholder="Enter group name"
                />

              </div>

              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">

                <span className="bg-orange-100 text-sm px-3 py-2 border-r border-gray-300">
                  List Students
                </span>

                <select
                  value={selectedStudent}
                  onChange={(e) => {

                    const value = e.target.value;

                    setSelectedStudent("");

                    if (value && !groupStudents.includes(value)) {

                      setGroupStudents([...groupStudents, value]);

                    }

                  }}
                  className="flex-1 p-2 outline-none"
                >

                  <option value="">Select students</option>

                  {students.map((student) => (
                    <option key={student._id} value={student._id}>
                      {student.first_name} {student.last_name}
                    </option>
                  ))}

                </select>

              </div>

              <div className="flex flex-wrap gap-2">

                {groupStudents.map((id) => {

                  const student = students.find((s) => s._id === id);

                  return (
                    <div
                      key={id}
                      className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm"
                    >

                      {student?.first_name} {student?.last_name}

                      <button
                        onClick={() =>
                          setGroupStudents(groupStudents.filter((s) => s !== id))
                        }
                        className="text-red-500 font-bold"
                      >
                        ×
                      </button>

                    </div>
                  );

                })}

              </div>

            </div>

          </div>

        </div>

      )}

      <DeleteConfirmModal
        isOpen={modalType === "delete"}
        title="Delete Group"
        message="Are you sure you want to delete this group?"
        onConfirm={deleteGroup}
        onCancel={() => setModalType(null)}
      />

    </>
  );
}