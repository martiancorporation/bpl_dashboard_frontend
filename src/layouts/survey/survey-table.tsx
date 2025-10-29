import { Button } from "@/components/ui/button";
import { Eye, PrinterIcon } from "lucide-react";
import TableSkeleton from "./table-skeleton";
import type { CommonProps } from "./types";
import { useReactToPrint } from "react-to-print";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import moment from "moment";

const SurveyTable: React.FC<CommonProps> = (_this) => {
  const navigate = useNavigate();
  const findLength = () => {
    const surveys_length = _this?.surveyData?.length || 0;
    return (_this?.total || 0) - surveys_length;
  };
  const componentRef = useRef<HTMLDivElement>(null);

  const reactToPrintFn = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Print Document",
    removeAfterPrint: true,
  } as any);

  return (
    <div className="w-full h-full flex flex-col gap-y-2.5">
      <div className="w-full flex flex-col md:flex-row gap-4 items-center justify-between pt-5 px-1.5">
        <div className="w-full md:w-auto flex justify-between md:justify-center items-center gap-x-1 ">
          <div className="text-sm text-[#4A4A4A]">Last 24 hours data -</div>
          <div className="bg-[#D8ECFF] text-[#4A4A4A] text-xs font-medium px-2 py-0.5 text-center rounded-2xl">
            100+
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          <Button
            onClick={() => reactToPrintFn()}
            variant="outline"
            size="sm"
            className="h-7 w-[87px] flex  rounded-[6px] gap-x-1 text-[#0D0D0D] shadow-none"
          >
            <PrinterIcon />
            Print
          </Button>
        </div>
      </div>

      <div ref={componentRef}>
        <Table className="rounded-[6px] shadow-none">
          <TableHeader className=" rounded-[6px] shadow-none">
            <TableRow>
              <TableHead className="w-[5%] border-r text-[#EAECF0]">
                No
              </TableHead>
              <TableHead className="w-[15%] border-r text-[#EAECF0]">
                Name
              </TableHead>
              <TableHead className="w-[10%] border-r text-[#EAECF0]">
                Gender
              </TableHead>
              <TableHead className="w-[10%] border-r text-[#EAECF0]">
                Age Group
              </TableHead>
              <TableHead className="w-[12%] border-r text-[#EAECF0]">
                Ward
              </TableHead>
              <TableHead className="w-[13%] border-r text-[#EAECF0]">
                Panchayat
              </TableHead>
              <TableHead className="w-[10%] border-r text-[#EAECF0]">
                Cast/Community
              </TableHead>
              <TableHead className="w-[10%] border-r text-[#EAECF0]">
                Preferred MLA
              </TableHead>
              <TableHead className="w-[10%] border-r text-[#EAECF0]">
                Date & Time
              </TableHead>

              <TableHead className="w-[5%]  text-[#EAECF0]">Actions</TableHead>
            </TableRow>
          </TableHeader>

          {_this.initialLoading ? (
            <TableSkeleton />
          ) : _this?.surveyData?.length === 0 ? (
            <TableCaption className="lg:h-[calc(100vh-160px)] border-none w-full bg-white">
              <div className="flex flex-col items-center justify-center h-full">
                No surveys Found
              </div>
            </TableCaption>
          ) : (
            <>
              <TableBody className="px-5">
                {_this?.surveyData?.map((survey, index) => {
                  const surveys_length = _this?.surveyData?.length || 0;
                  const isLast = index === surveys_length - 1;

                  return (
                    <TableRow
                      key={survey._id}
                      ref={isLast ? _this.lastElementRef : undefined}
                    >
                      <TableCell className="px-5 w-[5%] border-r text-center">
                        {index + 1}
                      </TableCell>
                      <TableCell className="w-[15%] text-[15px] max-w-[120px] border-r py-0 text-center truncate overflow-hidden whitespace-nowrap">
                        {survey?.name}
                      </TableCell>
                      <TableCell className="w-[10%] text-[15px] max-w-[120px] border-r py-0 text-center truncate overflow-hidden whitespace-nowrap">
                        {survey?.gender}
                      </TableCell>
                      <TableCell className="w-[10%] text-[15px] border-r text-center">
                        {survey?.age_group}
                      </TableCell>
                      <TableCell className="px-2 w-[12%] max-w-[120px] border-r py-0 text-center truncate overflow-hidden whitespace-nowrap">
                        {survey.ward_name}
                      </TableCell>
                      <TableCell className="w-[13%] max-w-[200px] text-[15px] border-r text-center truncate overflow-hidden whitespace-nowrap">
                        {survey.panchayat_name}
                      </TableCell>
                      <TableCell className="w-[10%] border-r text-center">
                        {survey?.caste}
                      </TableCell>
                      <TableCell className="w-[10%] border-r text-center">
                        {survey?.q7_trusted_leader}
                      </TableCell>
                      <TableCell className="w-[10%] text-[15px] max-w-[100px] border-r py-0 text-center truncate overflow-hidden whitespace-nowrap">
                        <span>
                          {moment(survey?.createdAt).format("DD MMM YYYY")}
                        </span>
                      </TableCell>
                      <TableCell className="w-[5%] text-center">
                        <TooltipProvider>
                          <Tooltip delayDuration={100}>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                onClick={() => {
                                  navigate(
                                    `/dashboard/survey-data/${survey?._id}`
                                  );
                                }}
                                className="text-blue-500 cursor-pointer"
                              >
                                <Eye />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              View survey
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              {_this?.loading && <TableSkeleton length={findLength()} />}
            </>
          )}
        </Table>
      </div>
    </div>
  );
};

export default SurveyTable;
