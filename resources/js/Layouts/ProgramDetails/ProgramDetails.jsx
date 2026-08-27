import FundAllocation from "./FundAllocation";
import ProgramInfo from "./ProgramInfo";

export default function ProgramDetails() {
  return (
    <section className="grid md:grid-cols-2 gap-8 mb-20">
      <FundAllocation />
      <ProgramInfo />
    </section>
  );
}
