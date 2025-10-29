import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import type { CommonProps } from "./types";

const Body: React.FC<CommonProps> = (_this) => {
  console.log(_this.survey);
  const survey = _this.survey ? _this.survey : undefined;
  return (
    <div className="container mx-auto px-8 h-full flex flex-col gap-y-4">
      <div className="w-full flex flex-col md:flex-row gap-4 items-center justify-between pt-5 px-1.5">
        <div className="w-full md:w-auto flex justify-between md:justify-center items-center gap-x-3 text-[14px] font-medium cursor-pointer">
          <span className="w-[25px] h-[25px] bg-[#F1F1F1] rounded-[5px] flex justify-center items-center">
            <ChevronLeft size={16} />
          </span>{" "}
          Preview
        </div>
      </div>
      <Card className="border rounded-lg overflow-hidden shadow-none p-0">
        <CardHeader className="bg-[#367CFF] text-white flex justify-between items-center py-2.5 px-4">
          <CardTitle className="text-[15px] font-normal">
            Basic Information
          </CardTitle>
          <span className="text-[13px] opacity-90">20/09/2024 - 12:00PM</span>
        </CardHeader>

        <CardContent className="grid grid-cols-2 md:grid-cols-5 gap-y-4 gap-x-8 text-sm p-4">
          <div>
            <p className="text-gray-500">Name</p>
            <p className="font-medium text-gray-900">{survey?.name}</p>
          </div>

          <div>
            <p className="text-gray-500">Gender</p>
            <p className="font-medium text-gray-900">{survey?.gender}</p>
          </div>

          <div>
            <p className="text-gray-500">Caste/Community</p>
            <p className="font-medium text-gray-900">{survey?.caste}</p>
          </div>

          <div>
            <p className="text-gray-500">Age Group</p>
            <p className="font-medium text-gray-900">{survey?.age_group}</p>
          </div>

          <div>
            <p className="text-gray-500">Ward</p>
            <p className="font-medium text-gray-900">{survey?.ward_name}</p>
          </div>

          <div>
            <p className="text-gray-500">Panchayat</p>
            <p className="font-medium text-gray-900">
              {survey?.panchayat_name}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Occupation</p>
            <p className="font-medium text-gray-900">{survey?.occupation}</p>
          </div>

          <div>
            <p className="text-gray-500">Mobile number</p>
            <p className="font-medium text-gray-900">
              {survey?.mobile_number ? survey.mobile_number : "N/A"}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border rounded-lg overflow-hidden shadow-none p-0">
        <CardHeader className="bg-[#367CFF] text-white flex justify-start items-center py-2.5 px-4">
          <CardTitle className="text-[15px] font-normal">
            Political Mood & Sentiment
          </CardTitle>
        </CardHeader>

        <CardContent className="p-4 space-y-4">
          {/* Q1 */}
          <div className="font-normal">
            <h2 className="font-medium text-[15px] mb-3">
              Q1. Who do you think will win the Balrampur election?
            </h2>
            <RadioGroup value={survey?.q1_winner_prediction} disabled>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="adil_hasan" id="q1-adil" />
                <Label htmlFor="q1-adil" className="font-normal">
                  Adil Hasan (AIMIM)
                </Label>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <RadioGroupItem value="mehboob_alam" id="q1-mehboob" />
                <Label htmlFor="q1-mehboob" className="font-normal">
                  Mehboob Alam (CPI(ML)L – Mahagathbandhan)
                </Label>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <RadioGroupItem value="sangeeta_devi" id="q1-sangeeta" />
                <Label htmlFor="q1-sangeeta" className="font-normal">
                  Sangeeta Devi (LJP-RV – NDA)
                </Label>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <RadioGroupItem value="not-decided" id="q1-not-decided" />
                <Label htmlFor="q1-not-decided" className="font-normal">
                  Not decided
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Q2 */}
          <div>
            <h2 className="font-medium text-[15px] mb-3">
              Q2. Are you satisfied with the current MLA’s performance (Mehboob
              Alam)?
            </h2>
            <RadioGroup value={survey?.q2_mla_satisfaction} disabled>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="q2-yes" />
                <Label htmlFor="q2-yes" className="font-normal">
                  Yes
                </Label>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <RadioGroupItem value="no" id="q2-no" />
                <Label htmlFor="q2-no" className="font-normal">
                  No
                </Label>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <RadioGroupItem value="mixed" id="q2-mixed" />
                <Label htmlFor="q2-mixed" className="font-normal">
                  Mixed opinion
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Q3 */}
          <div>
            <h2 className="font-medium text-[15px] mb-3">
              Q3. How do you describe the current mood of the voters in your
              area?
            </h2>
            <RadioGroup value={survey?.q3_voter_mood} disabled>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="angry" id="q3-angry" />
                <Label htmlFor="q3-angry" className="font-normal">
                  Angry 😡
                </Label>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <RadioGroupItem value="silent" id="q3-silent" />
                <Label htmlFor="q3-silent" className="font-normal">
                  Silent 🤐
                </Label>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <RadioGroupItem value="change" id="q3-change" />
                <Label htmlFor="q3-change" className="font-normal">
                  Want change 😔
                </Label>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <RadioGroupItem value="loyal" id="q3-loyal" />
                <Label htmlFor="q3-loyal" className="font-normal">
                  Loyal to old party 😊
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      <Card className="border rounded-lg overflow-hidden shadow-none p-0">
        <CardHeader className="bg-[#367CFF] text-white flex justify-start items-center py-2.5 px-4">
          <CardTitle className="text-[15px] font-normal">
            Issue Perception
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-6">
          {/* Q1 */}
          <div>
            <h2 className="font-medium text-[15px] mb-3">
              Q1. What is the biggest issue in your area?
            </h2>
            <RadioGroup value={survey?.q4_big_issue} disabled>
              {[
                { value: "roads", label: "Roads" },
                { value: "electricity", label: "Electricity" },
                { value: "health", label: "Health" },
                { value: "jobs", label: "Jobs" },
                { value: "education", label: "Education" },
                { value: "law_order", label: "Law & order" },
                { value: "others", label: "Others" },
              ].map((item, idx) => (
                <div className="flex items-center space-x-2 mt-2" key={idx}>
                  <RadioGroupItem value={item.value} id={`q1-${item.value}`} />
                  <Label htmlFor={`q1-${item.value}`} className="font-normal">
                    {item.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Q2 */}
          <div>
            <h2 className="font-medium text-[15px] mb-3">
              Q2. Which issue should the next MLA solve first?
            </h2>
            <RadioGroup value={survey?.q5_issue_priority} disabled>
              {[
                { value: "roads", label: "Roads" },
                { value: "electricity", label: "Electricity" },
                { value: "health", label: "Health" },
                { value: "jobs", label: "Jobs" },
                { value: "education", label: "Education" },
                { value: "law_order", label: "Law & order" },
                { value: "others", label: "Others" },
              ].map((item, idx) => (
                <div className="flex items-center space-x-2 mt-2" key={idx}>
                  <RadioGroupItem value={item.value} id={`q2-${item.value}`} />
                  <Label htmlFor={`q2-${item.value}`} className="font-normal">
                    {item.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Q3 */}
          <div>
            <h2 className="font-medium text-[15px] mb-3">
              Q3. Has your family directly received any govt. scheme benefit in
              last 2 years?
            </h2>
            <RadioGroup value={survey?.q6_scheme_benefit} disabled>
              {[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
                { value: "dont_know", label: "Don’t know" },
              ].map((item, idx) => (
                <div className="flex items-center space-x-2 mt-2" key={idx}>
                  <RadioGroupItem value={item.value} id={`q3-${item.value}`} />
                  <Label htmlFor={`q3-${item.value}`} className="font-normal">
                    {item.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      <Card className="border rounded-lg overflow-hidden shadow-none p-0">
        <CardHeader className="bg-[#367CFF] text-white flex justify-start items-center py-2.5 px-4">
          <CardTitle className="text-[15px] font-normal">
            Voting Intention & Behavior
          </CardTitle>
        </CardHeader>

        <CardContent className="p-4 space-y-6">
          {/* Q1 */}
          <div>
            <h2 className="font-medium text-[15px] mb-3">
              Q1. Have you decided whom to vote for on 11 November?
            </h2>
            <RadioGroup value={survey?.q9_voting_decision} disabled>
              {[
                { value: "firm_yes", label: "Yes — Firm decision" },
                { value: "leaning", label: "Leaning towards one party" },
                { value: "thinking", label: "Still thinking" },
                { value: "wont_vote", label: "Won’t vote" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem value={item.value} id={`q1-${item.value}`} />
                  <Label htmlFor={`q1-${item.value}`} className="font-normal">
                    {item.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Q2 */}
          <div>
            <h2 className="font-medium text-[15px] mb-3">
              Q2. What is your main reason for voting this way?
            </h2>
            <RadioGroup value={survey?.q10_voting_reason} disabled>
              {[
                { value: "leader_image", label: "Leader’s image" },
                { value: "caste", label: "Caste/community" },
                { value: "development", label: "Development work" },
                { value: "ideology", label: "Party ideology" },
                { value: "religion", label: "Religion" },
                { value: "other", label: "Other" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem value={item.value} id={`q2-${item.value}`} />
                  <Label htmlFor={`q2-${item.value}`} className="font-normal">
                    {item.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      <Card className="border rounded-lg overflow-hidden shadow-none p-0">
        <CardHeader className="bg-[#367CFF] text-white flex justify-start items-center py-2.5 px-4">
          <CardTitle className="text-[15px] font-normal">
            Communication & Influence
          </CardTitle>
        </CardHeader>

        <CardContent className="p-4 space-y-6">
          {/* Q1 */}
          <div>
            <h2 className="font-medium text-[15px] mb-3">
              Q1. Where do you get most political information from?
            </h2>
            <RadioGroup value={survey?.q11_info_source} disabled>
              {[
                { value: "tv", label: "TV" },
                { value: "whatsapp", label: "WhatsApp" },
                { value: "facebook", label: "Facebook" },
                { value: "local_leaders", label: "Local leaders" },
                { value: "mosque_elders", label: "Mosque / village elders" },
                { value: "other", label: "Other" },
              ].map((item) => (
                <div
                  key={item.value}
                  className="flex items-center space-x-2 mt-2"
                >
                  <RadioGroupItem value={item.value} id={`q4-${item.value}`} />
                  <Label htmlFor={`q4-${item.value}`} className="font-normal">
                    {item.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Q2 */}
          <div>
            <h2 className="font-medium text-[15px] mb-3">
              Q2. Who influences your voting decision most?
            </h2>
            <RadioGroup value={survey?.q12_influence} disabled>
              {[
                { value: "family", label: "Family" },
                { value: "local_leader", label: "Local leader" },
                { value: "youth_group", label: "Youth group" },
                { value: "religious_leader", label: "Religious leader" },
                { value: "self", label: "Self" },
                { value: "others", label: "Others" },
              ].map((item) => (
                <div
                  key={item.value}
                  className="flex items-center space-x-2 mt-2"
                >
                  <RadioGroupItem value={item.value} id={`q5-${item.value}`} />
                  <Label htmlFor={`q5-${item.value}`} className="font-normal">
                    {item.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* Aspirational Pulse */}
      <Card className="border rounded-lg overflow-hidden shadow-none p-0">
        <CardHeader className="bg-[#367CFF] text-white flex justify-start items-center py-2.5 px-4">
          <CardTitle className="text-[15px] font-normal">
            Aspirational Pulse
          </CardTitle>
        </CardHeader>

        <CardContent className="p-4 space-y-6">
          {/* Q1 */}
          <div>
            <h2 className="font-medium text-[15px] mb-3">
              Q1. What kind of leader do you want now?
            </h2>
            <RadioGroup value={survey?.q13_leader_type} disabled>
              {[
                { value: "educated", label: "Educated & honest" },
                { value: "strong", label: "Strong & fearless" },
                { value: "helpful", label: "Accessible & helpful" },
                { value: "religious_minded", label: "Religious minded" },
                { value: "doesnt_matter", label: "Doesn't matter" },
              ].map((item) => (
                <div
                  key={item.value}
                  className="flex items-center space-x-2 mt-2"
                >
                  <RadioGroupItem value={item.value} id={`q6-${item.value}`} />
                  <Label htmlFor={`q6-${item.value}`} className="font-normal">
                    {item.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Q2 */}
          <div>
            <h2 className="font-medium text-[15px] mb-3">
              Q2. What kind of Bihar do you dream of in the next 5 years?
            </h2>
            <p>
              <span className="pl-3">Ans:</span>
              {survey?.q14_bihar_dream}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Body;
