import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  XAxis,
  YAxis,
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../components/ui/chart";

export const description =
  "quatidade de propriedades registradas nas 5 principais capitais do pais";

const chartData = [
  { estado: "sao_paulo", quantidade: 275, fill: "var(--color-sao_paulo)" },
  {
    estado: "rio_de_janeiro",
    quantidade: 200,
    fill: "var(--color-rio_de_janeiro)",
  },
  { estado: "brasilia", quantidade: 187, fill: "var(--color-brasilia)" },
  { estado: "fortaleza", quantidade: 173, fill: "var(--color-fortaleza)" },
  { estado: "salvador", quantidade: 90, fill: "var(--color-salvador)" },
];
const chartConfig = {
  quantidade: {
    label: "quantidade",
  },
  sao_paulo: {
    label: "Sao Paulo",
    color: "hsl(var(--chart-1))",
  },
  rio_de_janeiro: {
    label: "Rio de Janeiro",
    color: "hsl(var(--chart-2))",
  },
  brasilia: {
    label: "Brasilia",
    color: "hsl(var(--chart-3))",
  },
  fortaleza: {
    label: "Fortaleza",
    color: "hsl(var(--chart-4))",
  },
  salvador: {
    label: "Salvador",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

const secondaryData = [
  { browser: "total", quantidade: 1260, fill: "var(--color-total)" },
];

const secChartConfig = {
  quantidade: {
    label: "propriedades",
  },
  total: {
    label: "Total",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const today = new Date();
const formattedDate = today.toLocaleDateString();

export function DashboardScreen() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-center">
        Registro de Propriedades - Indicadores Especiais
      </h1>
      <div className="flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>
              quatidade de propriedades registradas em cada estado
            </CardTitle>
            <CardDescription>
              <h2>Última atualização em: {formattedDate}</h2>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="estado"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) =>
                    chartConfig[value as keyof typeof chartConfig]?.label
                  }
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar
                  dataKey="quantidade"
                  strokeWidth={2}
                  radius={8}
                  activeIndex={2}
                  activeBar={({ ...props }) => {
                    return (
                      <Rectangle
                        {...props}
                        fillOpacity={0.8}
                        stroke={props.payload.fill}
                        strokeDasharray={4}
                        strokeDashoffset={4}
                      />
                    );
                  }}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="leading-none text-muted-foreground">
              Exibindo total de registros de cada estado
            </div>
          </CardFooter>
        </Card>
        <Card>
          {/* <CardHeader>
            <CardTitle>tipos de pesticida registrados</CardTitle>
          </CardHeader> */}
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={chartData}
                layout="vertical"
                margin={{
                  left: 0,
                }}
              >
                <YAxis
                  dataKey="estado"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) =>
                    chartConfig[value as keyof typeof chartConfig]?.label
                  }
                />
                <XAxis dataKey="quantidade" type="number" hide />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="quantidade" layout="vertical" radius={5} />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="leading-none text-muted-foreground">
              view de teste - visualização horizontal
            </div>
          </CardFooter>
        </Card>
      </div>
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Quantidade total de propriedades registradas</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={secChartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <RadialBarChart
              data={secondaryData}
              endAngle={100}
              innerRadius={80}
              outerRadius={140}
            >
              <PolarGrid
                gridType="circle"
                radialLines={false}
                stroke="none"
                className="first:fill-muted last:fill-background"
                polarRadius={[86, 74]}
              />
              <RadialBar dataKey="quantidade" background />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-4xl font-bold"
                          >
                            {chartData[0].quantidade.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            propriedades
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </PolarRadiusAxis>
            </RadialBarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="leading-none text-muted-foreground">
            exibindo quantidade total de propriedades registradas
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
