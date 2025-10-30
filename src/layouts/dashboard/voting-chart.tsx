
import { Bar, BarChart, CartesianGrid, XAxis, LabelList } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const chartConfig = {
  enquiries: {
    label: "Enquiries",
    color: "#008FE5",
  },
};



export function EnquiryChart() {
  const [isLoading, setIsLoading] = useState(false)
  

  return (
    <Card className=" w-full  rounded-[10px] border border-[#EEEEEE]  shadow-none p-0">
      <CardHeader className="flex justify-between items-center space-y-0 border-b sm:flex-row px-4 py-2 sm:py-2">
        <div className="flex flex-1 flex-col justify-center gap-1">
          <CardTitle>Enquiries Chart</CardTitle>     
        </div>
      </CardHeader>

      <CardContent className="px-2 sm:p-6">
        {isLoading ? (
          <div className="flex items-center justify-center p-6 h-[300px]">
            <Loader2 className="h-8 w-8 text-blue-400 animate-spin" />
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{ left: 12, right: 12 }}
              barGap={2}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey={viewType === "yearly" ? "month" : "date"}
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                minTickGap={25}
                tickFormatter={(value, index) => {
                  const currentData = chartData[index];
                  // Hide tick if enquiries are 0
                  if (currentData?.enquiries === 0) return "";
                  return viewType === "daily"
                    ? new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    : value;
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    hideLabel={viewType === "yearly"}
                    className="w-[100px]"
                    nameKey="enquiries"
                  />
                }
              />
              <Bar dataKey="enquiries" radius={[4, 4, 4, 4]} fill="#008FE5">
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                  formatter={(value) => (value === 0 ? "" : value)}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
