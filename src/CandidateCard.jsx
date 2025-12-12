export default function CandidateCard({ candidate }) {
    return (
      <div className="candidate-card">
        <h2>{candidate.name}</h2>
        <p>{candidate.role}</p>
  
        <div className="details">
          <p><b>Execution:</b> {candidate.execution}</p>
          <p><b>Ramp Speed:</b> {candidate.ramp}</p>
          <p><b>Attention Cost:</b> {candidate.attentionCost}</p>
          <p><b>Network:</b> {candidate.network}</p>
          <p><b>Salary:</b> ${candidate.salary.toLocaleString()}</p>
        </div>
      </div>
    );
  }
  