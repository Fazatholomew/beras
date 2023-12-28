<script lang="ts">
  import {
    registerMap,
    type EChartsOption,
    type EChartsType,
    init,
  } from "echarts";
  import { onMount } from "svelte";
  import { type DataType } from "./BarGraph.svelte";

  export let mapGeoJson: any;
  export let mapData: DataType[];

  let chartDom: HTMLElement;
  let myChart: EChartsType;
  let option: EChartsOption;

  onMount(() => {
    myChart = init(chartDom, { render: "SVG" });
    registerMap("Peta", mapGeoJson);
    let min: number = mapData[0].Beras;
    let max: number = mapData[0].Beras;
    for (let i = 1, n = mapData.length; i < n; i += 1) {
      if (mapData[i].Beras > max) {
        max = mapData[i].Beras;
      }
      if (mapData[i].Beras < min) {
        min = mapData[i].Beras;
      }
    }
    option = {
      title: {
        subtext: "Sumber Data: Badan Pusat Statistik",
        sublink:
          "https://sulut.bps.go.id/indicator/12/958/2/jumlah-penduduk-menurut-provinsi-di-indonesia.html",
        left: "right",
      },
      tooltip: {
        trigger: "item",
        formatter: (value) => {
          return `<b>${value.data.name} </b> <br/>
          <b>Jumlah Penduduk</b>: ${(value.data.Penduduk / 1000).toFixed(
            2
          )} Juta Jiwa <br/>
          <b>Produksi Beras</b>: ${(value.data.value / 1000).toFixed(
            2
          )} Ribu Ton`;
        },
        showDelay: 0,
        transitionDuration: 0.2,
      },
      visualMap: {
        left: "right",
        min,
        max,
        textStyle: {
          color: "white",
        },
        inRange: {
          color: [
            "#313695",
            "#4575b4",
            "#74add1",
            "#abd9e9",
            "#e0f3f8",
            "#ffffbf",
            "#fee090",
            "#fdae61",
            "#f46d43",
            "#d73027",
            "#a50026",
          ],
        },
        text: ["High", "Low"],
        calculable: true,
      },
      toolbox: {
        show: true,
        //orient: 'vertical',
        left: "left",
        top: "top",
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {},
        },
      },
      series: [
        {
          name: "Jumlah Penduduk",
          type: "map",
          roam: true,
          map: "Peta",
          nameProperty: "PROVINSI",
          emphasis: {
            label: {
              show: true,
            },
          },
          data: mapData
            .filter((row) => {
              return row.Tahun === 2022;
            })
            .map((row) => {
              return {
                name: row.Provinsi,
                value: row.Beras,
                Penduduk: row.Penduduk,
              };
            }),
          universalTransition: {
            enabled: true,
          },
        },
      ],
      animationThreshold: 1000000,
    };

    myChart.setOption(option);
  });
</script>

<div bind:this={chartDom} class="h-full" />
