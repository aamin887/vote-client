import { Outlet } from "react-router-dom";
import "./VoteResults.css";

function VoteResults() {
  return (
    <div className="voteresults__page">
      <div className="voteresults__page-container">
        <div className="voteresults__page-header">
          <h2 className="section__heading title__text">Votes Results</h2>
          <p className="section__text">all voting result can be found here</p>
        </div>
        <div className="voteresults__page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default VoteResults;

// "use client"

// import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// // Sample election data
// const electionData = [
//   { name: "Alice Johnson", votes: 1234567 },
//   { name: "Bob Smith", votes: 1156432 },
//   { name: "Carol Williams", votes: 978654 },
//   { name: "David Brown", votes: 845321 },
//   { name: "Eve Davis", votes: 567890 },
// ]

// export default function Component() {
//   return (
//     <Card className="w-full max-w-3xl">
//       <CardHeader>
//         <CardTitle>2024 Presidential Election Results</CardTitle>
//         <CardDescription>Number of votes received by each candidate</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer
//           config={{
//             votes: {
//               label: "Votes",
//               color: "hsl(var(--chart-1))",
//             },
//           }}
//           className="h-[400px]"
//         >
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={electionData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
//               <CartesianGrid strokeDasharray="3 3" horizontal={false} />
//               <XAxis type="number" tickFormatter={(value) => value.toLocaleString()} />
//               <YAxis dataKey="name" type="category" width={100} />
//               <ChartTooltip content={<ChartTooltipContent hideLabel />} />
//               <Bar dataKey="votes" fill="var(--color-votes)" radius={[0, 4, 4, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   )
// }
