"use client"
import { Status } from "@prisma/client";
import React from "react";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
interface dataEle {
  name: Status;
  total: number;
}

interface dataProps {
  data: dataEle[];
}
const DashChart = ({ data }: dataProps) => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Tickets Counts</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width={450} height={250}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Bar dataKey="total" fill="#60A5FA" radius={[4,4,0,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DashChart;
