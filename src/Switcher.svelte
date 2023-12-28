<script lang="ts">
  export let isChecked: boolean;
  export let setIsChecked: () => void;
</script>

<label
  class="themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center"
>
  <input
    type="checkbox"
    checked={isChecked}
    on:change={setIsChecked}
    class="sr-only"
  />
  <span class="label flex items-center text-md font-medium text-neutral-200">
    Map
  </span>
  <span
    class="slider mx-4 flex h-8 w-[60px] items-center rounded-full p-1 duration-200 {isChecked
      ? 'bg-[#344354]'
      : 'bg-[#CCCCCE]'}"
  >
    <span
      class="dot h-6 w-6 rounded-full bg-white duration-200 {isChecked
        ? 'translate-x-[28px]'
        : ''}"
    ></span>
  </span>
  <span class="label flex items-center text-md font-mediumtext-neutral-200">
    Graph
  </span>
</label>
