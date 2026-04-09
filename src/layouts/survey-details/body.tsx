import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { SURVEY_QUESTIONS } from "@/data/surveyQuestions";
import { useNavigate } from "react-router-dom";

interface SurveyResponse {
  _id: string;
  name: string;
  mobile: string;
  age_group: string;
  gender: string;
  caste: string;
  caste_other: string;
  occupation: string;
  block_name: string;
  panchayat_name: string;
  booth_name: string;
  ward_name: string;
  booth_no: string;
  question_1: string;
  question_2: string;
  question_3: string;
  question_4: string;
  question_5: string;
  question_6: string;
  question_7: string;
  question_8: string;
  question_9: string;
  question_10: string;
  question_11: string;
  serveyor_id: string;
  serveyor_name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Body = (_this: {
  survey: SurveyResponse | undefined;
  loading: boolean;
}) => {
  const navigate = useNavigate();
  const survey = _this.survey ? _this.survey : undefined;

  const questionAnswerMap = SURVEY_QUESTIONS.map((q) => {
    const rawAnswer = survey?.[q.id as keyof typeof survey] as string;
    const matchedOption = q.questions[0].options.find(
      (o) => o.id === rawAnswer,
    );

    return {
      question: q.title,
      answer: matchedOption?.label ?? rawAnswer, // falls back to raw if no match
    };
  });
  return (
    <div className="container mx-auto px-8 h-full flex flex-col gap-y-4">
      <div className="w-full flex flex-col md:flex-row gap-4 items-center justify-between pt-5 px-1.5">
        <div className="w-full md:w-auto flex justify-between md:justify-center items-center gap-x-3 text-[14px] font-medium cursor-pointer">
          <span onClick={() => navigate(-1)} className="w-[25px] h-[25px] bg-[#F1F1F1] rounded-[5px] flex justify-center items-center">
            <ChevronLeft size={16} />
          </span>{" "}
          Preview
        </div>
      </div>
      <Card className="border rounded-lg shadow-none p-0">
        <CardHeader className="bg-[#367CFF] rounded-t-lg text-white flex justify-between items-center py-2.5 px-4">
          <CardTitle className="text-[15px] font-normal">
            Basic Information
          </CardTitle>
          <span className="text-[13px] opacity-90">
            {survey?.createdAt &&
              new Date(survey?.createdAt).toLocaleString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
          </span>
        </CardHeader>

        <CardContent className="grid grid-cols-2 md:grid-cols-5 gap-y-4 gap-x-8 text-sm p-4">
          <div>
            <p className="text-gray-500">Name</p>
            <p className="font-medium text-gray-900 capitalize">{survey?.name}</p>
          </div>

          <div>
            <p className="text-gray-500">Gender</p>
            <p className="font-medium text-gray-900 capitalize">{survey?.gender}</p>
          </div>

          <div>
            <p className="text-gray-500">Caste/Community</p>
            <p className="font-medium text-gray-900 capitalize">{survey?.caste}</p>
          </div>

          <div>
            <p className="text-gray-500">Age Group</p>
            <p className="font-medium text-gray-900">{survey?.age_group}</p>
          </div>

          <div>
            <p className="text-gray-500">Ward</p>
            <p className="font-medium text-gray-900 capitalize">{survey?.ward_name}</p>
          </div>

          <div>
            <p className="text-gray-500">Panchayat</p>
            <p className="font-medium text-gray-900 capitalize">
              {survey?.panchayat_name}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Booth Name</p>
            <p className="font-medium text-gray-900 capitalize">
              {survey?.booth_name}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Occupation</p>
            <p className="font-medium text-gray-900 capitalize">{survey?.occupation}</p>
          </div>

          <div>
            <p className="text-gray-500">Mobile number</p>
            <p className="font-medium text-gray-900">
              {survey?.mobile ? survey.mobile : "N/A"}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border rounded-lg shadow-none p-0">
        <CardHeader className="bg-[#367CFF] rounded-t-lg text-white flex justify-start items-center py-2.5 px-4">
          <CardTitle className="text-[15px] font-normal">Responses</CardTitle>
        </CardHeader>

        <CardContent className="p-4 space-y-4">
          {questionAnswerMap.map((item, index) => (
            <div key={item.question}>
              <h2 className="font-medium text-[15px] mb-3">
                {index + 1}. {item.question}
              </h2>
              <p className="text-gray-900 flex items-center gap-x-2">
                <ArrowRight size={16} /> {item.answer}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Body;
