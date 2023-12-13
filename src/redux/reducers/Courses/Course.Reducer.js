import { COURSES } from "../../actions/Courses/ActionTypes";

const courseDataMock = [{
  courseTitle: "Test",
  id: "IIGM",
  totalVideos: "30",
  watchingHours: "10 hours",
  introVideo:
    "https://www.dropbox.com/scl/fi/bg83rgw1xjihpe615eqr6/TGTIntroductionVideo-Dev-Purpose.mp4?rlkey=dxh39zxqe7ffyaxt0sfukyu0m&dl=0",
  description: "Course on goat healthcare",
  department: "IIGMA",
  price: "5000",
  thumbnail:
    "https://www.open.edu/openlearn/pluginfile.php/3277384/tool_ocwmanage/articletext/0/become_a_student_inline.jpg",
  descriptionSummary:
    "Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text.",
  courseDetails:
    "Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text.",
  courseTopics: [
    "couresTopic",
    "couresTopic",
    "couresTopic",
    "couresTopic",
    "couresTopic",
    "couresTopic",
    "couresTopic",
  ],
  courseOverview: {
    header: "Introduction to Goat Management",
    body: "The Course Focuses on Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text",
  },
  courseContent: {
    header: "View All The Course Contents Here",
    body: ["Chapter1", "Chapter2", "Chapter3"],
  },
  otherInformation: {
    header: "Other Course Related Information",
    body: "Other Important Notices and Information Related to the Course. Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text",
  },
  eligibilityCriteria: {
    header: "Check If You Are Eligible For This Course",
    body: ["Detail1", "Detail2", "Detail3", "Detail4"],
  },
  courseContents: [
    {
      courseTitle: "Sub Heading1",
      lectureLink: "https://dl.dropboxusercontent.com/s/t05zdw2woogo4kh/ACW_3.mp4",
      description: "Description for Video 1. Sed ac urna vitae tortor congue pretium.",
      disabled: "false",
    },
    {
      courseTitle: "Sub Heading2",
      lectureLink: "",
      description: "Description for Video 2. Sed ac urna vitae tortor congue pretium.",
      disabled: "false",
    },
    {
      courseTitle: "Sub Heading3",
      lectureLink: "",
      description: "Description for Video 3. Sed ac urna vitae tortor congue pretium.",
      disabled: "true",
    },
    {
      courseTitle: "Sub Heading4",
      lectureLink: "",
      description: "Description for Video 4. Sed ac urna vitae tortor congue pretium.",
      disabled: "true",
    },
  ],
}];

const initialState = {
  courseData: courseDataMock,
  error: false,
  loading: false,
};

const CourseReducer = (state = initialState, action) => {
  switch (action.type) {
    case COURSES:
      return {
        ...state,
        courseData: action.payload,
        error: false,
        loading: false,
      };
    default:
      return state;
  }
};

export default CourseReducer;
