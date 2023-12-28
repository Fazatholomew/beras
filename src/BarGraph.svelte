<script lang="ts" context="module">
  export interface DataType {
    Provinsi: string;
    Beras: number;
    Penduduk: number;
    Tahun: number;
  }
</script>

<script lang="ts">
  import { type EChartsOption, type EChartsType, init } from "echarts";
  import { onMount, onDestroy } from "svelte";

  export let data: DataType[];
  export let column: string;
  export let unit: string;
  export let denominator: number = 1000000;
  
  const updateFrequency = 3000;

  let chartDom: HTMLElement | null;
  let chart: EChartsType;
  let years: number[];
  let currentYear: number = 0;
  let option: EChartsOption;

  const updateYear = (year: number) => {
    let source = data.filter((d: DataType) => {
      return d.Tahun === year;
    });
    (option as any).dataset.source = source;
    (option as any).graphic.elements[0].style.text = `${year}`;
    chart.setOption<EChartsOption>(option);
  };

  const renderAnimation = () => {
    for (let i = 0, n = years.length; i < n; i += 1) {
      (function (i) {
        setTimeout(function () {
          currentYear = i;
          updateYear(years[currentYear]);
        }, i * updateFrequency);
      })(i);
    }
  };

  const renderBar = () => {
    const uniqueYears: Set<number> = new Set();
    for (let i = 0; i < data.length; ++i) {
      uniqueYears.add(data[i].Tahun);
    }
    years = Array.from(uniqueYears).sort();
    option = {
      title: {
        text: column,
        textStyle: {
          color: 'white',
        },
        left: 'right'
      },
      grid: {
        top: 10,
        bottom: 30,
        left: 150,
        right: 80,
      },
      xAxis: {
        max: "dataMax",
        min: "dataMin",
        name: unit,
        nameLocation: 'middle',
        axisLabel: {
          formatter: function (n: number) {
            return (n / denominator).toFixed(2) + "";
          },
        },
      },
      // @ts-ignore
      dataset: {
        source: data.filter((d: DataType) => {
          return d.Tahun === years[currentYear];
        }),
      },
      yAxis: {
        type: "category",
        max: 20,
        inverse: true,
        axisLabel: {
          show: true,
          fontSize: 14,
        },
        animationDuration: 300,
        animationDurationUpdate: 300,
      },
      series: [
        {
          realtimeSort: true,
          seriesLayoutBy: "row",
          type: "bar",
          // itemStyle: {
          //   color: 'white'
          // },
          encode: {
            x: column,
            y: "Provinsi",
          },
          dimensions: [column, "Provinsi"],
          label: {
            show: true,
            // precision: 1,
            position: "right",
            valueAnimation: true,
            fontFamily: "monospace",
          },
        },
      ],
      // Disable init animation.
      // animationDuration: 0,
      animationDurationUpdate: updateFrequency,
      animationEasing: "linear",
      animationEasingUpdate: "linear",
      graphic: {
        elements: [
          {
            type: "text",
            right: 160,
            bottom: 60,
            style: {
              text: `${years[currentYear]}`,
              font: "bolder 80px monospace",
              fill: "rgba(100, 100, 100, 0.50)",
            },
            z: 100,
          },
        ],
      },
    };

    chart.setOption<EChartsOption>(option);
  };

  onMount(() => {
    chart = init(chartDom, {
      renderer: "svg",
    });
    chart.on("animationend", function () {
      // Resize the chart after the animation has ended
      chart.resize();
    });
    chart.showLoading();
    renderBar();
    chart.hideLoading();
    renderAnimation();
    window.addEventListener("resize", () => chart.resize());
  });

  onDestroy(() => {
    window.removeEventListener("resize", () => chart.resize());
  });
</script>

<div bind:this={chartDom} class="h-full" />
