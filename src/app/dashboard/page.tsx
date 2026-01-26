import PlanPieChart from "./components/PlanPieChart";
import SuscriptionMonthChart from "./components/SuscriptionMonthChart";
import SuscriptionPieChart from "./components/SuscriptionPieChart";
import UsersBarChart from "./components/UsersBarChart";

export default function Inicio() {
  return (
    <main className="w-full min-h-screen  max-w-[1400px] mx-auto p-10 overflow-x-hidden overflow-y-auto flex flex-col  gap-10">
      <section className="w-full h-full flex gap-4">
        <UsersBarChart />
        <SuscriptionPieChart />
      </section>
      <section className="w-full h-full flex gap-4">
        <SuscriptionMonthChart /> <PlanPieChart />
      </section>
    </main>
  );
}
