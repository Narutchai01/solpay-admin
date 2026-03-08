"use client";

import React from "react";
import { Box, Card, Typography } from "@mui/material";
import { PieChart, Pie, ResponsiveContainer, Legend, Label } from "recharts";
import { Theme } from "@/theme/theme";

interface CustomLabelProps {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  value?: number | string;
  name?: string;
  fill?: string;
}

interface CustomLabelLineProps {
  points?: { x: number; y: number }[];
  stroke?: string;
}

interface CustomLegendPayload {
  value?: string;
  color?: string;
}

interface CustomLegendProps {
  payload?: readonly CustomLegendPayload[];
}

const data = [
  { name: "USDT", value: 70, fill: Theme.colors.cyan },
  { name: "BTC", value: 10, fill: Theme.colors.coral },
  { name: "SQL", value: 20, fill: Theme.colors.amber },
];

const renderCustomizedLabel = (props: CustomLabelProps) => {
  const {
    cx = 0,
    cy = 0,
    midAngle = 0,
    outerRadius = 0,
    value,
    name,
    fill,
  } = props;

  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 30;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const textAnchor = x > cx ? "start" : "end";

  const gapX = x > cx ? 10 : -10;
  const gapY = 6;

  let finalX = x + gapX;
  const finalY = y + gapY;

  if (name === "BTC") {
    finalX += 20;
  }

  return (
    <text
      x={finalX}
      y={finalY}
      fill={fill}
      textAnchor={textAnchor}
      dominantBaseline="central"
    >
      <tspan
        x={finalX}
        dy="-0.5em"
        fontSize={Theme.fontSize.textS}
        fill={Theme.colors.onSurface}
      >
        {name}
      </tspan>
      <tspan
        x={finalX}
        dy="1.2em"
        fontSize={Theme.fontSize.h5}
        fontWeight="bold"
      >
        {value}
      </tspan>
    </text>
  );
};

const renderCustomizedLabelLine = (props: CustomLabelLineProps) => {
  const { points, stroke } = props;

  if (!points || points.length === 0) return <polyline />;

  const pointsString = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <polyline
      points={pointsString}
      stroke={stroke}
      strokeWidth={1}
      fill="none"
    />
  );
};

const renderCustomLegend = (props: CustomLegendProps) => {
  const { payload = [] } = props;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
      {payload.map((entry: CustomLegendPayload, index: number) => (
        <Box
          key={`item-${index}`}
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: entry.color,
            }}
          />
          <Typography
            sx={{
              color: Theme.colors.onSurface,
              fontSize: Theme.fontSize.textS,
              fontWeight: 500,
            }}
          >
            {entry.value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export const CompositionChart = () => {
  return (
    <Card
      sx={{
        height: 450,
        width: "50%",
        position: "relative",
        p: 4,
        boxShadow: "none",
        border: "none",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={120}
            dataKey="value"
            stroke="none"
            label={renderCustomizedLabel}
            labelLine={renderCustomizedLabelLine}
          >
            <Label
              value="100"
              position="center"
              fill={Theme.colors.onSurface}
              style={{
                fontSize: Theme.fontSize.h4,
                fontWeight: 800,
              }}
            />
          </Pie>

          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            content={renderCustomLegend}
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};
