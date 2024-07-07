import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admission from "../screens/admission/admission";
import ClassList from "../screens/class/classList";
import ExamResult from "../screens/exam/examResult";
import ExamSchedule from "../screens/exam/examSchd";
import FeeStructure from "../screens/fees/feeStruc";
import FeeSubmission from "../screens/fees/feeSubmission";
import FeeVoucher from "../screens/fees/feeVoucher";
import Registration from "../screens/school/registration";
import StudentList from "../screens/students/stdList";
import StudentAddEdt from "../screens/students/stdAddEdt";
import TransferStudentList from "../screens/students/transferStd";
import SubjectList from "../screens/subject/subList";
import SubjectAddEdt from "../screens/subject/subAddEdt";
import SyllabusList from "../screens/syllabus/syllList";
import SyllabusForm from "../screens/syllabus/syllForm";
import TeacherList from "../screens/teacher/teacherList";
import TeacherAddEdt from "../screens/teacher/teacherAddEdt";
import TeacherAllocation from "../screens/teacher/teacherAllocAdd";
import AddClassForm from "../screens/class/classForm";

import Login from "../pages/login";
import Dashboard from "../pages/dashboard";
import NotFoundScreen from "../pages/notfound";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />}>
        <Route path="*" element={<NotFoundScreen />}/>
          <Route path="admission" element={<Admission onClose={function (): void {
            throw new Error("Function not implemented.");
          } } />} />
          <Route path="class/form" element={<AddClassForm onClose={() => {}} onSave={(classData) => { return Promise.resolve();}}/>}/>
          <Route path="class/list" element={<ClassList />} />
          <Route path="exam/result" element={<ExamResult />} />
          <Route path="exam/schedule" element={<ExamSchedule />} />
          <Route path="fees/structure" element={<FeeStructure />} />
          <Route path="fees/submission" element={<FeeSubmission onClose={function (): void {
            throw new Error("Function not implemented.");
          } } onSave={function (editedFee: { feeType: string; amount: number; }): Promise<void> {
            throw new Error("Function not implemented.");
          } } initialFee={null} />}/>
          <Route path="fees/voucher" element={<FeeVoucher onClose={function (): void {
            throw new Error("Function not implemented.");
          } } fee={null} />} />
          <Route path="school/registration" element={<Registration onClose={function (): void {
            throw new Error("Function not implemented.");
          } }  />} />
          <Route path="students/list" element={<StudentList />} />
          <Route path="students/add" element={<StudentAddEdt onClose={() => { } } onSave={() => { } } selectedStudent={null} />} />
          <Route path="students/transfer" element={<TransferStudentList students={[]} />} />
          <Route path="subject/list" element={<SubjectList />} />
          <Route path="subject/add" element={<SubjectAddEdt onClose={function (): void {
            throw new Error("Function not implemented.");
          } } onSubmit={function (subject: { class: string; subject: string; }): void {
            throw new Error("Function not implemented.");
          } } />} />
          <Route path="syllabus/list" element={<SyllabusList />} />
        <Route
          path="syllabus/form"
          element={<SyllabusForm onClose={() => {}} onSave={(syllabus) => Promise.resolve()} />}
        />
          <Route path="teacher/list" element={<TeacherList />} />
          <Route path="teacher/add" element={<TeacherAddEdt onClose={function (): void {
            throw new Error("Function not implemented.");
          } } editTeacher={null} />} />
          <Route path="teacher/allocation" element={<TeacherAllocation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
